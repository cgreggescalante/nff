import { FirestoreDataConverter } from 'firebase/firestore';
import type { Entry, EntryData } from '../models/Entry';
import { WorkoutTypeName, WorkoutTypeNames } from '../WorkoutType';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => ({
    user: entry.user,
    event: entry.event,
    points: entry.points,
    goals: entry.goals,
  }),
  fromFirestore: (snapshot, options): Entry => {
    const data = snapshot.data(options) as EntryData;

    const points = new Map<WorkoutTypeName, number>(
      WorkoutTypeNames.map((name) => [
        name,
        data.points[name] ? data.points[name] : 0,
      ])
    );
    const goals = new Map<WorkoutTypeName, number>(
      WorkoutTypeNames.map((name) => [
        name,
        data.goals[name] ? data.goals[name] : 0,
      ])
    );

    return {
      uid: snapshot.id,
      userRef: data.userRef,
      eventRef: data.eventRef,
      points,
      goals,
    };
  },
};
