import { UserInfo } from "./UserInfo";
import { Workout } from "./Workout";
import {
  FirestoreDataConverter,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { WorkoutTypeFromName } from "./WorkoutType";

export class Upload {
  user: UserInfo | undefined;
  userRef: DocumentReference;
  description: string;
  date: Date;
  workouts: Workout[];
  resolved: boolean;

  constructor(userRef: DocumentReference, description: string, date: Date, workouts: []) {
    this.userRef = userRef;
    this.description = description;
    this.date = date;
    this.workouts = workouts;

    this.resolved = false;
  }

  static fromFirestore = (data: DocumentData) => {
    const workouts = data['workouts'].map(
      (workout: { [x: string]: string }) => ({
        ...workout,
        workoutType: WorkoutTypeFromName(workout['workoutType'])
      })
    );

    return new Upload(data['user'], data['description'], data['date'], workouts);
  }

  toFirestore = () => ({
    user: this.user,
    description: this.description,
    date: this.date,
    workouts: this.workouts
  });
}

export const uploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => upload.toFirestore(),
  fromFirestore: (snapshot, options): Upload => {
    const data = snapshot.data(options);
    return Upload.fromFirestore(data);
  },
};