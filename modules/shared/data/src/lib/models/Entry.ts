import { DocumentReference } from '@firebase/firestore';
import { WorkoutTypeToNumber } from './WorkoutType';
import { Team } from './Team';
import { WithMetaData } from './Models';
import { UserInfo } from './UserInfo';
import { Event } from './Event';

export interface Entry {
  userRef: DocumentReference<UserInfo>;
  eventRef: DocumentReference<Event>;
  teamRef?: DocumentReference<Team>;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
  points: number;
}

export type EntryWithMetaData = Entry & WithMetaData<Entry>;
