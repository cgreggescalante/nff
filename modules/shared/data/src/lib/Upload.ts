import { UserInfo } from './UserInfo';
import { Workout } from './Workout';
import { FirestoreDataConverter, DocumentReference } from 'firebase/firestore';
import { WorkoutTypeFromName } from './WorkoutType';

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

  static converter: FirestoreDataConverter<Upload> = {
    toFirestore: (upload: Upload) => ({
      user: upload.user,
      description: upload.description,
      date: upload.date,
      workouts: upload.workouts,
    }),
    fromFirestore: (snapshot, options): Upload => {
      const data = snapshot.data(options);
      const workouts = data['workouts'].map(
        (workout: { [x: string]: string }) => ({
          ...workout,
          workoutType: WorkoutTypeFromName(workout['workoutType']),
        })
      );

      return new Upload(
        data['user'],
        data['description'],
        new Date(data['date']['seconds'] * 1000),
        workouts
      );
    },
  };
}
