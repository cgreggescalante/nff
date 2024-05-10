import { WorkoutTypeToNumber } from './WorkoutType';
import { WithMetaData } from './Models';

export interface Upload {
  userId: string;
  userDisplayName: string;
  description: string;
  date: Date;
  workouts: WorkoutTypeToNumber;
}

export type UploadWithMetaData = Upload & WithMetaData<Upload>;
