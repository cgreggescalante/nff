import { FirestoreDataConverter } from 'firebase/firestore';
import type { Entry } from '../models/Entry';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => ({
    userRef: entry.userRef,
    eventRef: entry.eventRef,
    duration: entry.duration,
    goals: entry.goals,
  }),
  fromFirestore: (snapshot, options): Entry => snapshot.data(options) as Entry,
};
