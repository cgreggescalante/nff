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
      WorkoutTypes.map((workoutType) => [
        workoutType,
        data.points[workoutType.name] ? data.points[workoutType.name] : 0,
      ])
    );
    const goals = new Map<WorkoutType, number>(
      WorkoutTypes.map((workoutType) => [
        workoutType,
        data.goals[workoutType.name] ? data.goals[workoutType.name] : 0,
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
