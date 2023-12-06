import { EntryWithMetaData, EventWithMetadata, UserInfo } from '../../models';
import { getDocs, query, where } from '@firebase/firestore';
import {
  EntryCollectionRef,
  getEntryCollectionRef,
  getEventRef,
} from '../CollectionRefs';

import { readUser } from './user';
import { withMetaData } from './all';

export const readEntry = async (
  eventUid: string,
  userUid: string
): Promise<EntryWithMetaData | null> => {
  const entryCollectionRef = getEntryCollectionRef(userUid);

  const snapshot = await getDocs(
    query(entryCollectionRef, where('eventRef', '==', getEventRef(eventUid)))
  );

  if (snapshot.size === 0) return null;
  return withMetaData(snapshot.docs[0]);
};

export const getUserLeaderboard = async (
  event: EventWithMetadata
): Promise<
  {
    user: UserInfo;
    entry: EntryWithMetaData;
  }[]
> => {
  // TODO: Resolve list of documentReferences
  const entries = await getDocs(
    query(EntryCollectionRef, where('eventRef', '==', event.ref))
  );

  const leaderboardEntries: {
    user: UserInfo;
    entry: EntryWithMetaData;
  }[] = [];

  for (const entry of entries.docs) {
    const user = await readUser(entry.data().userRef.id);
    if (!user) continue;
    leaderboardEntries.push({
      user,
      entry: withMetaData(entry),
    });
  }

  leaderboardEntries.sort((a, b) => b.entry.points - a.entry.points);

  return leaderboardEntries;
};
