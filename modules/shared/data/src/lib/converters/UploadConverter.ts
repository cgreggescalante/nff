import { FirestoreDataConverter } from 'firebase/firestore';
import type Upload from '../models/Upload';
import { WorkoutConverter } from './WorkoutConverter';

const UploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => ({
    user: upload.userRef,
    userFirstName: upload.userFirstName,
    userLastName: upload.userLastName,
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
        duration: workout['duration'],
        type: workout['type'],
      })
    );

    return {
      userRef: data['user'],
      userFirstName: data['userFirstName'],
      userLastName: data['userLastName'],
      description: data['description'],
      date: new Date(data['date']['seconds'] * 1000),
      workouts,
    };
  },
};

export default UploadConverter;
