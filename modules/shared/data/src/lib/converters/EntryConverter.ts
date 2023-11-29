import { FirestoreDataConverter } from 'firebase/firestore';
import type { Entry } from '../models/Entry';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => ({
    userRef: entry.userRef,
    eventRef: entry.eventRef,
    teamRef: entry.teamRef,
    duration: entry.duration,
    goals: entry.goals,
    points: entry.points,
  }),
  fromFirestore: (snapshot, options): Entry => {
    return {
      ...(snapshot.data(options) as Entry),
      uid: snapshot.id,
    };
  },
};
