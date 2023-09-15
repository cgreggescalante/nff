import { WorkoutType, WorkoutTypeFromName } from "./WorkoutType";
import { FirestoreDataConverter } from "firebase/firestore";

export interface Workout {
  workoutType: WorkoutType,
  duration: number,
  points: number
}

export const workoutConverter: FirestoreDataConverter<Workout> = {
  toFirestore: (workout: Workout) => ({
    workoutType: workout.workoutType.name,
    duration: workout.duration,
    points: workout.points
  }),
  fromFirestore: (snapshot, options): Workout => {
    const data = snapshot.data(options);
    return {
      workoutType: WorkoutTypeFromName[data['workoutType']],
      duration: data['duration'],
      points: data['points'],
    };
  }
}