import { DocumentReference } from '@firebase/firestore';

import { WorkoutTypeToNumber } from './WorkoutType';
import { WithMetaData } from './Models';

export interface Upload {
  userRef: DocumentReference;
  userFirstName: string;
  userLastName: string;
  description: string;
  date: Date;
  workouts: WorkoutTypeToNumber;
}

export type UploadWithMetaData = Upload & WithMetaData<Upload>;

export default Upload;
