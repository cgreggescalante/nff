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
  duration: WorkoutTypeToNumber;
  goal: number;
  category: string;
  points: number;
}

export type EntryWithMetaData = Entry & WithMetaData<Entry>;
