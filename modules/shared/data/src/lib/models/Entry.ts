import { DocumentReference } from 'firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';

export interface EntryData {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference;
  event?: Event;
  duration: Record<string, number>;
  goals: Record<string, number>;
}

export interface Entry {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference;
  event?: Event;
  duration: Map<string, number>;
  goals: Map<string, number>;
}

export default Entry;
