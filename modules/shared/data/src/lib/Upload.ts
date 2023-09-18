import { UserInfo } from "./UserInfo";
import { Workout } from "./Workout";
import { FirestoreDataConverter, DocumentReference } from 'firebase/firestore';
import { WorkoutTypeFromName } from "./WorkoutType";

export interface Upload {
  user?: UserInfo,
  userRef?: DocumentReference,
  description: string
  date: Date,
  workouts: Workout[]
  resolved: boolean
}

export const uploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => ({
    user: upload.user,
    description: upload.description,
    date: upload.date,
    workouts: upload.workouts
  }),
  fromFirestore: (snapshot, options): Upload => {
    const data = snapshot.data(options);
    return {
      userRef: data['user'],
      description: data['description'],
      date: new Date(data['date']['seconds'] * 1000),
      workouts: data['workouts'].map((workout: { [x: string]: string }) => ({
        ...workout,
        workoutType: WorkoutTypeFromName(workout['workoutType']),
      })),
      resolved: false,
    };
  },
};