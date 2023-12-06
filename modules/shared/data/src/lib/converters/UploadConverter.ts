import { FirestoreDataConverter } from '@firebase/firestore';
import type Upload from '../models/Upload';

const UploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => ({
    user: upload.userRef,
    userFirstName: upload.userFirstName,
    userLastName: upload.userLastName,
    description: upload.description,
    date: upload.date,
    workouts: upload.workouts,
  }),
  fromFirestore: (snapshot, options): Upload => {
    const data = snapshot.data(options);

    return {
      userRef: data['user'],
      userFirstName: data['userFirstName'],
      userLastName: data['userLastName'],
      description: data['description'],
      date: new Date(data['date']['seconds'] * 1000),
      workouts: data['workouts'],
    };
  },
};

export default UploadConverter;
