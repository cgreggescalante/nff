import { FirestoreDataConverter } from '@firebase/firestore';
import type { Entry, EntryWithUid } from '../models/Entry';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => Object.assign({}, entry),
  fromFirestore: (snapshot, options): EntryWithUid => {
    return {
      ...(snapshot.data(options) as Entry),
      uid: snapshot.id,
    };
  },
};
