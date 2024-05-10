import { WORKOUT_CONFIG } from '../CONFIG';

export type WorkoutTypeToNumber = { [k: string]: number };

export const addWorkoutTypeToNumber = (
  a: WorkoutTypeToNumber,
  b: WorkoutTypeToNumber
): WorkoutTypeToNumber => {
  const result = { ...a };

  for (const key in b) {
    if (result[key]) {
      result[key] += b[key];
    } else {
      result[key] = b[key];
    }
  }

  return result;
};

export const ApplyScoring = (workouts: WorkoutTypeToNumber): number =>
  WORKOUT_CONFIG.reduce(
    (acc, workout) =>
      workouts[workout.name]
        ? acc + workouts[workout.name] * workout.pointRate
        : acc,
    0
  );

export const getUnitType = (workoutType: string): 'distance' | 'time' => {
  const config = WORKOUT_CONFIG.find((config) => config.name === workoutType);
  if (!config) throw new Error(`Workout type ${workoutType} not found`);
  return config.units;
};
