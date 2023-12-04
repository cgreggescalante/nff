import { db } from '../firebase';
import {
  arrayRemove,
  arrayUnion,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import type Event from '../models/Event';
import type { EventWithUid } from '../models/Event';
import { readUser } from './UserInfoService';
import { addDoc, doc, getDoc, updateDoc } from '@firebase/firestore';
import UserInfo from '../models/UserInfo';
import { Entry, EntryWithUid } from '../models/Entry';
import { Team, TeamWithUid } from '../models/Team';
import {
  EntryCollectionRef,
  EventCollectionRef,
  TeamCollectionRef,
  UserCollectionRef,
} from './CollectionRefs';

export const createEvent = async (event: Event): Promise<EventWithUid> => {
  const docRef = await addDoc(EventCollectionRef, event);
  return { ...event, uid: docRef.id };
};

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

export const registerUserForEvent = async (
  event: EventWithUid,
  userUid: string
): Promise<EntryWithUid> => {
  const userRef = doc(UserCollectionRef, userUid);
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
    const user = await readUser(entry.data().userRef.id);
    if (!user) continue;
    leaderboardEntries.push({
      user,
      entry: { ...entry.data(), uid: entry.id },
    });
  }

  leaderboardEntries.sort((a, b) => b.entry.points - a.entry.points);

  return leaderboardEntries;
};

export const listEvents = async (): Promise<EventWithUid[]> => {
  const events = await getDocs(EventCollectionRef);
  return events.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
};

export const readEvent = async (uid: string): Promise<EventWithUid | null> => {
  const event = await getDoc(doc(EventCollectionRef, uid));
  return event.exists() ? { ...event.data(), uid } : null;
};
