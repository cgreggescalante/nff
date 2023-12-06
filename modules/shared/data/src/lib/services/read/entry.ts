import { Entry, EntryWithUid } from '../../models/Entry';
import { getDocs, query, where } from 'firebase/firestore';
import {
  EntryCollectionRef,
  getEntryCollectionRef,
  getEventRef,
} from '../CollectionRefs';
import { EventWithUid } from '../../models/Event';
import UserInfo from '../../models/UserInfo';

import { readUser } from './user';

export const getEntry = async (
  eventUid: string,
  userUid: string
): Promise<EntryWithUid | null> => {
  const entryCollectionRef = getEntryCollectionRef(userUid);

  const snapshot = await getDocs(
    query(entryCollectionRef, where('eventRef', '==', getEventRef(eventUid)))
  );

  if (snapshot.size === 0) return null;
  return { ...(snapshot.docs[0].data() as Entry), uid: snapshot.docs[0].id };
};

export const getUserLeaderboard = async (
  event: EventWithUid
): Promise<
  {
    user: UserInfo;
    entry: EntryWithUid;
  }[]
> => {
  const eventRef = getEventRef(event.uid);

  // TODO: Resolve list of documentReferences
  const entries = await getDocs(
    query(EntryCollectionRef, where('eventRef', '==', eventRef))
  );

  const leaderboardEntries: {
    user: UserInfo;
    entry: EntryWithUid;
  }[] = [];

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
