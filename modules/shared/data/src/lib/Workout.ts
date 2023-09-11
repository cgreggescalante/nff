import { WorkoutType } from "./WorkoutType";

export interface Workout {
  workoutType: WorkoutType,
  duration: number,
  points: number
}