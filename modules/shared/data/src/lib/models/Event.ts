import { DocumentReference, Timestamp } from 'firebase/firestore';
import { ScoringConfiguration } from './ScoringConfiguration';

export interface EventData {
  uid: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
  registeredUsers: DocumentReference[];
  scoringConfiguration: ScoringConfiguration;
}

export interface Event {
  uid?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
  registeredUsers: DocumentReference[];
  scoringConfiguration: ScoringConfiguration;
}

export default Event;
