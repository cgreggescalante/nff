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

// TODO: Use these interfaces, remove ? fields from Entry
export interface EntryWithUser extends Entry {
  user: UserInfo;
}

export interface EntryWithEvent extends Entry {
  event: Event;
}

export interface EntryWithTeam extends Entry {
  team: Team;
}

export default Entry;
