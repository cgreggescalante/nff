import { WorkoutType } from '../WorkoutType';

export interface Workout {
  workoutType: WorkoutType;
  duration: number;
  points: number;
}

export const DefaultWorkout = () => ({
  workoutType: WorkoutType.RUN,
  duration: 0,
  points: 0,
});

export default Workout;
