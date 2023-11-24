import { FirestoreDataConverter } from 'firebase/firestore';
import Workout from '../models/Workout';

export const WorkoutConverter: FirestoreDataConverter<Workout> = {
  toFirestore: (workout: Workout) => ({
    type: workout.type,
    duration: workout.duration,
  }),
  fromFirestore: (snapshot, options): Workout => {
    const data = snapshot.data(options);
    return {
      type: data['type'],
      duration: data['duration'],
    };
  },
};
