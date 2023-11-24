import { DocumentReference } from 'firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';

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

export interface WorkoutTypeToNumber {
  Run?: number;
  Bike?: number;
  Ski?: number;
  Swim?: number;
}

export default Entry;
