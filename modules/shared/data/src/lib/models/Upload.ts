import type UserInfo from './UserInfo';
import type Workout from './Workout';
import { DocumentReference } from 'firebase/firestore';

export interface Upload {
  user?: UserInfo;
  userRef?: DocumentReference;
  userFirstName: string;
  userLastName: string;
  description: string;
  date: Date;
  workouts: Workout[];
}

export default Upload;
