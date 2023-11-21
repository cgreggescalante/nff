import { DocumentReference } from 'firebase/firestore';
import { WorkoutTypeName } from '../WorkoutType';
import type UserInfo from './UserInfo';
import type Event from './Event';

export interface EntryData {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference;
  event?: Event;
  points: Record<string, number>;
  goals: Record<string, number>;
}

export interface Entry {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference;
  event?: Event;
  points: Map<WorkoutTypeName, number>;
  goals: Map<WorkoutTypeName, number>;
}

export default Entry;
