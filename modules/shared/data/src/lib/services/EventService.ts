import { FirestoreService } from './FirestoreService';
import { db } from '../firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  DocumentReference,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import type Event from '../models/Event';
import type { EventWithUid } from '../models/Event';
import { EventConverter } from '../converters/EventConverter';
import UserInfoService from './UserInfoService';
import { addDoc, doc, updateDoc } from '@firebase/firestore';
import UserInfo from '../models/UserInfo';
import { Entry, EntryWithUid } from '../models/Entry';
import { Team, TeamWithUid } from '../models/Team';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { EntryConverter } from '../converters/EntryConverter';
import { TeamConverter } from '../converters/TeamConverter';

class EventService extends FirestoreService<Event> {
  public constructor() {
    super(collection(db, 'events'), EventConverter);
  }
}

export default new EventService();

const EventCollectionRef = collection(db, 'events').withConverter(
  EventConverter
);
const UserCollectionRef = collection(db, 'users').withConverter(
  UserInfoConverter
);
const EntryCollectionRef = collection(db, 'entries').withConverter(
  EntryConverter
);
const TeamCollectionRef = collection(db, 'teams').withConverter(TeamConverter);

export const createEvent = async (event: Event): Promise<EventWithUid> => {
  const docRef = await addDoc(EventCollectionRef, event);
  return { ...event, uid: docRef.id };
};

// Delete event
// Delete teams
// Delete entries
// Remove entries from users
export const deleteEvent = async (event: EventWithUid): Promise<void> => {
  return runTransaction(db, async (transaction) => {
    const eventRef = doc(EventCollectionRef, event.uid);

    transaction.delete(eventRef);

    const teams = await getDocs(
      query(TeamCollectionRef, where('eventRef', '==', eventRef))
    );

    for (const team of teams.docs) {
      transaction.delete(team.ref);
    }

    const entries = await getDocs(
      query(EntryCollectionRef, where('eventRef', '==', eventRef))
    );

    for (const entry of entries.docs) {
      transaction.delete(entry.ref);
      transaction.update(entry.data().userRef, {
        entryRefs: arrayRemove(entry.ref),
      });
    }
  });
};

// Add userRef to registeredUsers array
// Create new entry for user
// Add entryRef to user's entryRefs array
export const registerUserForEvent = async (
  event: EventWithUid,
  user: UserInfo
): Promise<EntryWithUid> => {
  const userRef = doc(UserCollectionRef, user.uid);
  const eventRef = doc(EventCollectionRef, event.uid);

  await updateDoc(eventRef, {
    registeredUserRefs: arrayUnion(userRef),
  });

  const entry: Entry = {
    userRef,
    eventRef,
    duration: {},
    goals: {},
    points: 0,
  };

  const entryRef = await addDoc(EntryCollectionRef, entry);

  await updateDoc(userRef, {
    entryRefs: arrayUnion(entryRef),
  });

  return { ...entry, uid: entryRef.id };
};

// Create the team
// Add to event's teamRefs array
// Register the user if they aren't already registered
// Update the user's entry
export const createTeamByOwner = async (
  event: EventWithUid,
  owner: UserInfo
): Promise<TeamWithUid> => {
  const ownerRef = doc(UserCollectionRef, owner.uid);

  const registered = event.registeredUserRefs
    .map((ref) => ref.path)
    .includes(ownerRef.path);
  if (!registered) throw new Error('User is not registered for this event');

  const eventRef = doc(EventCollectionRef, event.uid);

  const team: Team = {
    name: `${owner.name.firstName} ${owner.name.lastName}'s Team`,
    ownerRef,
    memberRefs: [ownerRef],
    eventRef,
    points: 0,
  };

  const teamRef = await addDoc(TeamCollectionRef, team);

  await updateDoc(eventRef, {
    teamRefs: arrayUnion(teamRef),
  });

  const entryRef = await getDocs(
    query(
      EntryCollectionRef,
      where('userRef', '==', ownerRef),
      where('eventRef', '==', eventRef)
    )
  );

  await updateDoc(entryRef.docs[0].ref, {
    teamRef,
  });

  return { ...team, uid: teamRef.id };
};

export const getUserLeaderboard = async (
  event: EventWithUid
): Promise<{ user: UserInfo; entry: EntryWithUid }[]> => {
  console.log(event.uid);
  const eventRef = doc(EventCollectionRef, event.uid);

  const entries = await getDocs(
    query(EntryCollectionRef, where('eventRef', '==', eventRef))
  );

  console.log(entries.size);

  const leaderboardEntries: { user: UserInfo; entry: EntryWithUid }[] = [];

  for (const entry of entries.docs) {
    const user = await UserInfoService.read(
      entry.data().userRef as DocumentReference<UserInfo>
    );
    if (!user) continue;
    leaderboardEntries.push({
      user,
      entry: { ...entry.data(), uid: entry.id },
    });
  }

  leaderboardEntries.sort((a, b) => b.entry.points - a.entry.points);

  return leaderboardEntries;
};
