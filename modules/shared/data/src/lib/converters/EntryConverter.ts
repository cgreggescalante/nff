import { FirestoreDataConverter } from 'firebase/firestore';
import type { Entry, EntryData } from '../models/Entry';
import { WorkoutType, WorkoutTypes } from '../WorkoutType';

export const EntryConverter: FirestoreDataConverter<Entry> = {
  toFirestore: (entry: Entry) => ({
    user: entry.user,
    event: entry.event,
    points: entry.points,
    goals: entry.goals,
  }),
  fromFirestore: (snapshot, options): Entry => {
    const data = snapshot.data(options) as EntryData;

    const points = new Map<WorkoutType, number>(
      Object.entries(WorkoutTypes).map(([name, workoutType]) => [
        workoutType,
        data.points[name] ? data.points[name] : 0,
      ])
    );
    const goals = new Map<WorkoutType, number>(
      Object.entries(WorkoutTypes).map(([name, workoutType]) => [
        workoutType,
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
