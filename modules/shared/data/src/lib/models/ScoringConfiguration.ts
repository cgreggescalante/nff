import { WorkoutType, WorkoutTypeToNumber } from './WorkoutType';

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

export const ApplyScoring = (
  scoringConfiguration: ScoringConfiguration,
  workouts: WorkoutTypeToNumber
): number => {
  let score = 0;
  scoringConfiguration.scoringRules.forEach((rule) => {
    if (!workouts[rule.workoutType]) return;

    if (
      rule.comboActivity &&
      rule.comboRate &&
      workouts[rule.comboActivity]! > 0
    )
      score += workouts[rule.workoutType]! * rule.comboRate;
    else score += workouts[rule.workoutType]! * rule.standardRate;
  });
  return score;
};
