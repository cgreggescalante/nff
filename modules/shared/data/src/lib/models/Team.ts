import { DocumentReference } from '@firebase/firestore';
import { WithMetaData } from './Models';
import { Entry } from './Entry';
import { Event } from './Event';

export interface Team {
  name: string;
  points: number;
  ownerEntryRef: DocumentReference<Entry>;
  entryRefs: DocumentReference<Entry>[];
  eventRef: DocumentReference<Event>;
}

export type TeamWithMetaData = Team & WithMetaData<Team>;
