import { DocumentReference } from 'firebase/firestore';

export interface Team {
  uid: string;
  name: string;
  ownerRef: DocumentReference;
  memberRefs: DocumentReference[];
  eventRef: DocumentReference;
  points: number;
}
