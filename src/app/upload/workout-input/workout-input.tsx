import styles from './workout-input.module.scss';
import React, { ChangeEvent } from 'react';
import { WorkoutType } from '@shared-data';

export interface WorkoutProps {
  index: number;
  workoutType: WorkoutType;
  duration: number | undefined;
  handleDurationChange: (workoutType: WorkoutType, value: number) => void;
}

// Individual workout component
export const WorkoutInput: React.FC<WorkoutProps> = ({
  index,
  workoutType,
  duration,
  handleDurationChange,
}) => {
  return (
    <div>
      {workoutType}

      <input
        className={styles['durationInput']}
        id={`duration${index}`}
        type="number"
        name={`duration${index}`}
        value={duration}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleDurationChange(workoutType, parseInt(e.target.value, 10))
        }
      />
    </div>
  );
};
