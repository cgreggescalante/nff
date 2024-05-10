import { DocumentReference, Timestamp } from '@firebase/firestore';
import { WithMetaData } from './Models';
import { Entry } from './Entry';

export interface EventData {
  startDate: Timestamp;
  endDate: Timestamp;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
}

export interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;
  entryRefs: DocumentReference<Entry>[];
}

export type EventWithMetadata = Event & WithMetaData<Event>;
