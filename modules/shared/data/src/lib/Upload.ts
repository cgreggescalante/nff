import { User } from "./User";
import { Workout } from "./Workout";

export interface Upload {
  user?: User,
  description: string
  date: Date,
  workouts: Workout[]
}