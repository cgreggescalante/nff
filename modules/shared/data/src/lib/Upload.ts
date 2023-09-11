import { User } from "./User";
import { Workout } from "./Workout";

export interface Upload {
  user: User,
  date: Date,
  workouts: Workout[]
}