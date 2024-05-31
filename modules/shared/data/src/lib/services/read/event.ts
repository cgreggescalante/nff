import { EventCollectionRef, getEventRef } from '../CollectionRefs';
import { listDocuments, readDocument } from './all';
import { getEntriesByEvent } from './entry';

export const listEvents = listDocuments(EventCollectionRef);

export const readEvent = readDocument(getEventRef);

export const isUserRegisteredForEvent = async (
  userUid: string,
  eventUid: string
): Promise<boolean> => {
  const entries = await getEntriesByEvent(eventUid);

  return entries.some((entry) => entry.userId === userUid);
};
