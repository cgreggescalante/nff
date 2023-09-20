import { WorkoutType, WorkoutTypeFromName } from "./WorkoutType";
import { FirestoreDataConverter } from "firebase/firestore";

export class Workout {
  workoutType: WorkoutType;
  duration: number;
  points: number;

  constructor(workoutType: WorkoutType, duration: number, points: number) {
    this.workoutType = workoutType;
    this.duration = duration;
    this.points = points;
  }

  static default = () => new Workout(WorkoutType.RUN, 0, 0);

  static converter: FirestoreDataConverter<Workout> = {
    toFirestore: (workout: Workout) => ({
      workoutType: workout.workoutType.name,
      duration: workout.duration,
      points: workout.points
    }),
    fromFirestore: (snapshot, options): Workout => {
      const data = snapshot.data(options);
      return {
        workoutType: WorkoutTypeFromName(data['workoutType']),
        duration: data['duration'],
        points: data['points'],
      };
    }
  }
}