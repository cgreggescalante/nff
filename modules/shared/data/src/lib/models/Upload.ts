import type UserInfo from './UserInfo';
import { DocumentReference } from 'firebase/firestore';

import { WorkoutTypeToNumber } from './WorkoutType';

// TODO: Remove user
export interface Upload {
  user?: UserInfo;
  userRef?: DocumentReference;
  userFirstName: string;
  userLastName: string;
  description: string;
  date: Date;
  workouts: WorkoutTypeToNumber;
}

export interface UploadWithUser extends Upload {
  user: UserInfo;
}

export default Upload;
