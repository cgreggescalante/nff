import { DocumentReference } from 'firebase/firestore';
import UserInfo from './UserInfo';
import Event from './Event';

export interface Team {
  name: string;
  ownerRef: DocumentReference<UserInfo>;
  memberRefs: DocumentReference<UserInfo>[];
  eventRef: DocumentReference<Event>;
  points: number;
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
