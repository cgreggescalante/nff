import { DocumentReference } from 'firebase/firestore';
import type UserInfo from './UserInfo';
import type Event from './Event';
import { WorkoutTypeToNumber } from './WorkoutType';
import { Team } from './Team';
import { WithUid } from './FirestoreModel';

export interface Entry extends WithUid {
  userRef: DocumentReference<UserInfo>;
  eventRef: DocumentReference<Event>;
  teamRef: DocumentReference<Team>;
  duration: WorkoutTypeToNumber;
  goals: WorkoutTypeToNumber;
  points: number;
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
