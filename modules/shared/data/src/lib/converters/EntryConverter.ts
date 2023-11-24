import { FirestoreDataConverter } from 'firebase/firestore';
import type { Entry, EntryData } from '../models/Entry';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => {
    return {
      userRef: entry.userRef,
      eventRef: entry.eventRef,
      duration: entry.duration,
      goals: entry.goals,
    };
  },
  fromFirestore: (snapshot, options): Entry => {
    const data = snapshot.data(options) as EntryData;

    return {
      uid: snapshot.id,
      userRef: data.userRef,
      eventRef: data.eventRef,
      duration: data.duration,
      goals: data.goals,
    };
  },
};
