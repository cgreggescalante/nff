import { db } from '../firebase';
import {
  doc,
  collection,
  collectionGroup,
  CollectionReference,
  DocumentReference,
} from '@firebase/firestore';
import {
  EntryConverter,
  EventConverter,
  MessageConverter,
  TeamConverter,
  UploadConverter,
} from '../converters';
import { Entry, Team, Event } from '@shared-data';

export const MessageCollectionRef = collection(db, 'messages').withConverter(
  MessageConverter
);
export const EventCollectionRef = collection(db, 'events').withConverter(
  EventConverter
);
export const EntryCollectionGroupRef = collectionGroup(
  db,
  'entries'
).withConverter(EntryConverter);
export const UploadCollectionRef = collection(db, 'uploads').withConverter(
  UploadConverter
);

/**
 * Returns the Firestore DocumentReference for the given document name
 */
export type GetDocumentReference<T> = (
  documentName: string
) => DocumentReference<T>;

export const getEventRef = (eventId: string): DocumentReference<Event> =>
  doc(EventCollectionRef, eventId).withConverter(EventConverter);

export const getTeamRef = (
  eventId: string,
  teamId: string
): DocumentReference<Team> =>
  doc(EventCollectionRef, eventId, 'teams', teamId).withConverter(
    TeamConverter
  );

export const getEntryCollectionRef = (
  eventId: string
): CollectionReference<Entry> =>
  collection(EventCollectionRef, eventId, 'entries').withConverter(
    EntryConverter
  );

export const getTeamCollectionRef = (
  eventId: string
): CollectionReference<Team> =>
  collection(EventCollectionRef, eventId, 'teams').withConverter(TeamConverter);
