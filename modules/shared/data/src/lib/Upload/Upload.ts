import { UserInfo } from '../UserInfo';
import { Workout } from '../Workout';
import { DocumentReference } from 'firebase/firestore';

export class Upload {
  user: UserInfo | undefined;
  userRef: DocumentReference;
  description: string;
  date: Date;
  workouts: Workout[];
  resolved: boolean;

  constructor(
    userRef: DocumentReference,
    description: string,
    date: Date,
    workouts: []
  ) {
    this.userRef = userRef;
    this.description = description;
    this.date = date;
    this.workouts = workouts;

    this.resolved = false;
  }
}
