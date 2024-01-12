export interface WorkoutTypeToNumber {
  Run?: number;
  Bike?: number;
  Ski?: number;
  Swim?: number;
}

export type WorkoutType = keyof WorkoutTypeToNumber;

export const addWorkoutTypeToNumber = (
  a: WorkoutTypeToNumber,
  b: WorkoutTypeToNumber
): WorkoutTypeToNumber => {
  return {
    Run: (a.Run ?? 0) + (b.Run ?? 0),
    Bike: (a.Bike ?? 0) + (b.Bike ?? 0),
    Ski: (a.Ski ?? 0) + (b.Ski ?? 0),
    Swim: (a.Swim ?? 0) + (b.Swim ?? 0),
  };
};

export const getUnitType = (workoutType: WorkoutType): 'Miles' | 'Minutes' => {
  switch (workoutType) {
    case 'Bike':
    case 'Run':
    case 'Ski':
    case 'Swim':
      return 'Miles';
  }
};

export const WorkoutTypeNames: WorkoutType[] = ['Run', 'Bike', 'Ski', 'Swim'];
