import { DocumentReference } from '@firebase/firestore';
import { UserInfo } from './UserInfo';
import { WithMetaData } from './Models';
import { Entry } from './Entry';
import { Event } from './Event';

export interface Team {
  name: string;
  points: number;
  ownerRef: DocumentReference<UserInfo>;
  entryRefs: DocumentReference<Entry>[];
  eventRef: DocumentReference<Event>;
}

export type TeamWithMetaData = Team & WithMetaData<Team>;
