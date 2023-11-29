import { DocumentReference, Timestamp } from 'firebase/firestore';
import { ScoringConfiguration } from './ScoringConfiguration';
import { Team } from './Team';
import UserInfo from './UserInfo';
import { WithUid } from './FirestoreModel';

export interface EventData {
  uid: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
  registeredUserRefs: DocumentReference<UserInfo>[];
  scoringConfiguration: ScoringConfiguration;
  teamRefs: DocumentReference<Team>[];
  ownerRefs: DocumentReference<UserInfo>[];
}

export interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
  registeredUserRefs: DocumentReference<UserInfo>[];
  teamRefs: DocumentReference<Team>[];
  ownerRefs: DocumentReference<UserInfo>[];
  scoringConfiguration: ScoringConfiguration;
}

export interface EventWithTeams extends Event {
  teams: Team[];
}

export type EventWithUid = Event & WithUid;

export default Event;
