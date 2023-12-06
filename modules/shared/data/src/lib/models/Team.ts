import { DocumentReference } from '@firebase/firestore';
import UserInfo from './UserInfo';
import Event from './Event';
import Entry from './Entry';

export interface Team {
  name: string;
  points: number;
  ownerRef: DocumentReference<UserInfo>;
  entryRefs: DocumentReference<Entry>[];
  eventRef: DocumentReference<Event>;
}

export interface TeamWithUid extends Team {
  uid: string;
}

export interface TeamWithOwner extends Team {
  owner: UserInfo;
}

export interface TeamWithMembers extends Team {
  members: UserInfo[];
}
