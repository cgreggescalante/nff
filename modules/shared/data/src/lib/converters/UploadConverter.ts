import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import type Upload from '../models/Upload';
import type { UploadWithMetaData } from '../models/Upload';
import { withMetaData } from '../services/read/all';

const UploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => Object.assign({}, upload),
  fromFirestore: (snapshot, options): UploadWithMetaData => ({
    ...withMetaData(snapshot as QueryDocumentSnapshot<Upload>, options),
    date: new Date(snapshot.data(options)['date']['seconds'] * 1000),
  }),
};

export default UploadConverter;
