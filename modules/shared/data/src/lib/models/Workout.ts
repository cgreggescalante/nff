import { WorkoutType, WorkoutTypes } from '../WorkoutType';

export interface Workout {
  workoutType: WorkoutType;
  duration: number;
  points: number;
}

export const DefaultWorkout = () => ({
  workoutType: WorkoutTypes.RUN,
  duration: 0,
  points: 0,
});

export default Workout;
