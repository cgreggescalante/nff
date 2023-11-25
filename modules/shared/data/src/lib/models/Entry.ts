import { DocumentReference } from 'firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';
import { WorkoutTypeToNumber } from './WorkoutType';

export interface Entry {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference<Event>;
  event?: Event;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
  points: number;
}

export default Entry;
