import { FirestoreDataConverter } from 'firebase/firestore';
import type { Entry, EntryData } from '../models/Entry';
import { WorkoutTypeNames } from '../WorkoutType';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => {
    return {
      userRef: entry.userRef,
      eventRef: entry.eventRef,
      duration: Object.fromEntries(entry.duration),
      goals: Object.fromEntries(entry.goals),
    };
  },
  fromFirestore: (snapshot, options): Entry => {
    const data = snapshot.data(options) as EntryData;

    const duration = new Map<string, number>(
      WorkoutTypeNames.map((name) => [
        name,
        data.duration[name] ? data.duration[name] : 0,
      ])
    );
    const goals = new Map<string, number>(
      WorkoutTypeNames.map((name) => [
        name,
        data.goals[name] ? data.goals[name] : 0,
      ])
    );

    return {
      uid: snapshot.id,
      userRef: data.userRef,
      eventRef: data.eventRef,
      duration,
      goals,
    };
  },
};
