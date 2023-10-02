import { FirestoreDataConverter } from 'firebase/firestore';
import { WorkoutTypeFromName } from '../WorkoutType';
import type Upload from '../models/Upload';
import { WorkoutConverter } from './WorkoutConverter';

const UploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => ({
    user: upload.userRef,
    description: upload.description,
    date: upload.date,
    workouts: upload.workouts.map((workout) =>
      WorkoutConverter.toFirestore(workout)
    ),
  }),
  fromFirestore: (snapshot, options): Upload => {
    const data = snapshot.data(options);
    const workouts = data['workouts'].map(
      (workout: { [x: string]: string }) => ({
        ...workout,
        workoutType: WorkoutTypeFromName(workout['workoutType']),
      })
    );

    return {
      userRef: data['user'],
      description: data['description'],
      date: new Date(data['date']['seconds'] * 1000),
      workouts,
    };
  },
};

export default UploadConverter;
