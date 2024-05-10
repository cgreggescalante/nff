import { EntryWithMetaData, EventWithMetadata } from '../../models';
import { getDocs, query, where } from '@firebase/firestore';
import { getEntryCollectionRef, getEventRef } from '../CollectionRefs';
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
): Promise<EntryWithMetaData[]> => {
  const snapshot = await getDocs(getEntryCollectionRef(event.uid));

  const entries = snapshot.docs.map((doc) => withMetaData(doc));

  entries.sort((a, b) => a.points - b.points);

  return entries;
};

export const getEntriesByEvent = async (
  event: EventWithMetadata
): Promise<EntryWithMetaData[]> => {
  const snapshot = await getDocs(getEntryCollectionRef(event.uid));

  return snapshot.docs.map((doc) => withMetaData(doc));
};
