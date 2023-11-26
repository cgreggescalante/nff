import { DocumentReference } from 'firebase/firestore';
import UserInfo from './UserInfo';

export interface Team {
  name: string;
  ownerRef: DocumentReference;
  memberRefs: DocumentReference[];
  eventRef: DocumentReference;
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
