import { DocumentReference } from 'firebase/firestore';

export interface Event {
  uid?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
  registeredUsers: DocumentReference[];
}

export default Event;
