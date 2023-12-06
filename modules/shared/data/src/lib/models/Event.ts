import { DocumentReference, Timestamp } from '@firebase/firestore';
import { ScoringRule } from './ScoringConfiguration';
import { WithMetaData } from './Models';
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

export type EventWithMetadata = Event & WithMetaData<Event>;

export default Event;
