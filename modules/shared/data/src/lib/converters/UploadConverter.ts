import { DocumentReference, FirestoreDataConverter } from '@firebase/firestore';
import type Upload from '../models/Upload';
import type { UploadWithMetaData } from '../models/Upload';

const UploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => Object.assign({}, upload),
  fromFirestore: (snapshot, options): UploadWithMetaData => {
    const data = snapshot.data(options);

    return {
      userRef: data['user'],
      userFirstName: data['userFirstName'],
      userLastName: data['userLastName'],
      description: data['description'],
      date: new Date(data['date']['seconds'] * 1000),
      workouts: data['workouts'],
      uid: snapshot.id,
      ref: snapshot.ref as DocumentReference<Upload>,
    };
  },
};

export default UploadConverter;
