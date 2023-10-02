import { UserInfo } from './UserInfo';
import { Workout } from './Workout';
import { DocumentReference } from 'firebase/firestore';

export class Upload {
  user: UserInfo | undefined;
  userRef: DocumentReference;
  description: string;
  date: Date;
  workouts: Workout[];

  constructor(
    userRef: DocumentReference,
    description: string,
    date: Date,
    workouts: Workout[]
  ) {
    this.userRef = userRef;
    this.description = description;
    this.date = date;
    this.workouts = workouts;
  }
}
