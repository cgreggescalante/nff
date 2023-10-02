import { DocumentReference } from 'firebase/firestore';
import { WorkoutType } from '../WorkoutType';
import UserInfo from './UserInfo';
import { Event } from './Event';

export interface EntryData {
  uid: string;
  userRef: DocumentReference;
  user: UserInfo | undefined;
  eventRef: DocumentReference;
  event: Event | undefined;
  points: Record<string, number>;
  goals: Record<string, number>;
}

export class Entry {
  uid: string;
  userRef: DocumentReference;
  user: UserInfo | undefined;
  eventRef: DocumentReference;
  event: Event | undefined;
  points: Map<WorkoutType, number>;
  goals: Map<WorkoutType, number>;

  constructor(
    uid: string,
    userRef: DocumentReference,
    eventRef: DocumentReference,
    points: Map<WorkoutType, number>,
    goals: Map<WorkoutType, number>
  ) {
    this.uid = uid;
    this.userRef = userRef;
    this.eventRef = eventRef;
    this.points = points;
    this.goals = goals;
  }
}
