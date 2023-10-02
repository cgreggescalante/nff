import { FirestoreDataConverter } from 'firebase/firestore';
import { WorkoutTypeFromName } from '../WorkoutType';
import Workout from '../models/Workout';

export const WorkoutConverter: FirestoreDataConverter<Workout> = {
  toFirestore: (workout: Workout) => ({
    workoutType: workout.workoutType.name,
    duration: workout.duration,
    points: workout.points,
  }),
  fromFirestore: (snapshot, options): Workout => {
    const data = snapshot.data(options);
    return {
      workoutType: WorkoutTypeFromName(data['workoutType']),
      duration: data['duration'],
      points: data['points'],
    };
  },
};
