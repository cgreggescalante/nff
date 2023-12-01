import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import { EventConverter } from '../converters/EventConverter';
import { TeamConverter } from '../converters/TeamConverter';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { EntryConverter } from '../converters/EntryConverter';
import UploadConverter from '../converters/UploadConverter';

export const EventCollectionRef = collection(db, 'events').withConverter(
  EventConverter
);
export const UserCollectionRef = collection(db, 'users').withConverter(
  UserInfoConverter
);
export const EntryCollectionRef = collection(db, 'entries').withConverter(
  EntryConverter
);
export const TeamCollectionRef = collection(db, 'teams').withConverter(
  TeamConverter
);
export const UploadCollectionRef = collection(db, 'uploads').withConverter(
  UploadConverter
);
