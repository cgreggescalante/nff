import { DocumentReference } from '@firebase/firestore';

import { WorkoutTypeToNumber } from './WorkoutType';
import { WithMetaData } from './Models';
import { UserInfo } from './UserInfo';

export interface Upload {
  userRef: DocumentReference<UserInfo>;
  userFirstName: string;
  userLastName: string;
  description: string;
  date: Date;
  workouts: WorkoutTypeToNumber;
}

export type UploadWithMetaData = Upload & WithMetaData<Upload>;
