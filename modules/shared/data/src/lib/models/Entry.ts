import { DocumentReference } from '@firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';
import { WorkoutTypeToNumber } from './WorkoutType';
import { Team } from './Team';
import { WithMetaData } from './Models';

export interface Entry {
  userRef: DocumentReference<UserInfo>;
  eventRef: DocumentReference<Event>;
  teamRef?: DocumentReference<Team>;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
  points: number;
}

export type EntryWithMetaData = Entry & WithMetaData<Entry>;

export default Entry;
