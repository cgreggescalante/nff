import {
  collection,
  collectionGroup,
  DocumentReference,
} from 'firebase/firestore';
import { db } from '../firebase';
import { EventConverter } from '../converters/EventConverter';
import { TeamConverter } from '../converters/TeamConverter';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { EntryConverter } from '../converters/EntryConverter';
import UploadConverter from '../converters/UploadConverter';
import { doc } from '@firebase/firestore';
import Entry from '../models/Entry';

export const EventCollectionRef = collection(db, 'events').withConverter(
  EventConverter
);
export const UserCollectionRef = collection(db, 'users').withConverter(
  UserInfoConverter
);
export const EntryCollectionRef = collectionGroup(db, 'entries').withConverter(
  EntryConverter
);
export const TeamCollectionRef = collectionGroup(db, 'teams').withConverter(
  TeamConverter
);
export const UploadCollectionRef = collectionGroup(db, 'uploads').withConverter(
  UploadConverter
);

export const getEntryRef = (
  userUid: string,
  entryUid: string
): DocumentReference<Entry> => {
  return doc(db, 'users', userUid, 'entries', entryUid).withConverter(
    EntryConverter
  );
};

export const getEntryCollectionRef = (userUid: string) => {
  return collection(db, 'users', userUid, 'entries').withConverter(
    EntryConverter
  );
};

export const getTeamRef = (eventUid: string, teamUid: string) => {
  return doc(db, 'events', eventUid, 'teams', teamUid).withConverter(
    TeamConverter
  );
};

export const getTeamCollectionRef = (eventUid: string) => {
  return collection(db, 'events', eventUid, 'teams').withConverter(
    TeamConverter
  );
};

export const getUploadRef = (userUid: string, uploadUid: string) => {
  return doc(db, 'users', userUid, 'uploads', uploadUid).withConverter(
    UploadConverter
  );
};

export const getUploadCollectionRef = (userUid: string) => {
  return collection(db, 'users', userUid, 'uploads').withConverter(
    UploadConverter
  );
};
