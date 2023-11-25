import { DocumentReference } from 'firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';
import { WorkoutTypeToNumber } from './WorkoutType';
import { Team } from './Team';

export interface Entry {
  uid: string;
  userRef: DocumentReference;
  user?: UserInfo;
  eventRef: DocumentReference<Event>;
  event?: Event;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
  points: number;
  teamRef: DocumentReference<Team>;
}

export default Entry;
