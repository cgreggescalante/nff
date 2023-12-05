import { DocumentReference, Timestamp } from 'firebase/firestore';
import { ScoringRule } from './ScoringConfiguration';
import { Team } from './Team';
import { WithUid } from './Models';
import Entry from './Entry';

export interface EventData {
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
  entryRefs: DocumentReference<Entry>[];
  scoringRules: ScoringRule[];
}

export interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
  entryRefs: DocumentReference<Entry>[];
  scoringRules: ScoringRule[];
}

export interface EventWithTeams extends Event {
  teams: Team[];
}

export type EventWithUid = Event & WithUid;

export default Event;
