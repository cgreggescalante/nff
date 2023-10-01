import { WorkoutType } from '../WorkoutType';

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
}
