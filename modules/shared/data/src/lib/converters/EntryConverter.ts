import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import type { Entry, EntryWithMetaData } from '../models/Entry';
import { withMetaData } from '../services/read/all';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => Object.assign({}, entry),
  fromFirestore: (snapshot, options): EntryWithMetaData =>
    withMetaData(snapshot as QueryDocumentSnapshot<Entry>, options),
};
