import { DocumentReference } from '@firebase/firestore';
import { WorkoutTypeToNumber } from './WorkoutType';
import { Team } from './Team';
import { WithMetaData } from './Models';
import { Event } from './Event';

export interface Entry {
  userId: string;
  userDisplayName: string;
  eventRef: DocumentReference<Event>;
  teamRef?: DocumentReference<Team>;
  activities: WorkoutTypeToNumber;
  activityPoints: WorkoutTypeToNumber;
  points: number;
  goal: number;
  category: string;
}

export type EntryWithMetaData = Entry & WithMetaData<Entry>;
