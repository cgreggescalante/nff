import { Timestamp } from 'firebase/firestore';

export interface EventData {
  uid: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
}

export interface Event {
  uid: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
}

export default Event;
