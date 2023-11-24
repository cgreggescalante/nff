import { DocumentReference } from 'firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';
import { WorkoutTypeToNumber } from './WorkoutType';

export interface EntryData {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference;
  event?: Event;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
}

export interface Entry {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference;
  event?: Event;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
}

export default Entry;
