import { EntryWithMetaData, EventWithMetadata, UserInfo } from '../../models';
import { getDocs, query, runTransaction, where } from '@firebase/firestore';
import { getEntryCollectionRef, getEventRef } from '../CollectionRefs';
import { withMetaData } from './all';
import { db } from '../../firebase';

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
  const leaderboardEntries: {
    user: UserInfo;
    entry: EntryWithMetaData;
  }[] = [];

  await runTransaction(db, async (transaction) => {
    for (const entryRef of event.entryRefs) {
      const entrySnapshot = await transaction.get(entryRef);
      if (entrySnapshot.exists()) {
        const entry = withMetaData(entrySnapshot);
        const user = await transaction.get(entry.userRef);
        leaderboardEntries.push({
          user: withMetaData(user),
          entry,
        });
      }
    }
  });

  // TODO sort by points / goal
  leaderboardEntries.sort((a, b) => b.entry.points - a.entry.points);

  return leaderboardEntries;
};
