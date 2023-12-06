import { DocumentReference } from '@firebase/firestore';

export interface WithMetaData<T> {
  ref: DocumentReference<T>;
  uid: string;
}
