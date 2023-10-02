import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface EventData {
  uid: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
  registeredUsers: DocumentReference[];
}

export interface Event {
  uid: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
  registeredUsers: DocumentReference[];
}

export default Event;
