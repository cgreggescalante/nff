import { WorkoutType } from './WorkoutType';

// Applies to a specific workout type for a specific event
// If comboActivity is specified, then the comboRate applies to the workoutType when they are logged together
export interface ScoringRule {
  workoutType: WorkoutType;
  standardRate: number;
  comboActivity?: WorkoutType;
  comboRate?: number;
}

export interface ScoringConfiguration {
  scoringRules: ScoringRule[];
}
