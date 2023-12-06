import { DocumentReference } from '@firebase/firestore';
import UserInfo from './UserInfo';
import Event from './Event';
import Entry from './Entry';
import { WithMetaData } from './Models';

export interface Team {
  name: string;
  points: number;
  ownerRef: DocumentReference<UserInfo>;
  entryRefs: DocumentReference<Entry>[];
  eventRef: DocumentReference<Event>;
}

export type TeamWithMetaData = Team & WithMetaData<Team>;
