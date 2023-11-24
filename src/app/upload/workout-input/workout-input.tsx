import styles from './workout-input.module.scss';
import React, { ChangeEvent } from 'react';
import { Workout } from '@shared-data';
import { WorkoutTypeNames } from '@shared-data';

export interface WorkoutProps {
  index: number;
  workoutData: Workout;
  handleWorkoutTypeChange: (index: number, value: string) => void;
  handleDurationChange: (index: number, value: number) => void;
  handleDelete: (index: number) => void;
}

// Individual workout component
export const WorkoutInput: React.FC<WorkoutProps> = ({
  index,
  workoutData,
  handleWorkoutTypeChange,
  handleDurationChange,
  handleDelete,
}) => {
  return (
    <div>
      <button onClick={() => handleDelete(index)}>X</button>
      <label htmlFor={`workoutType${index}`}>Workout Type:</label>
      <select
        id={`workoutType${index}`}
        name={`workoutType${index}`}
        value={workoutData.type ? workoutData.type : 'Run'}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleWorkoutTypeChange(index, e.target.value)
        }
      >
        {WorkoutTypeNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor={`duration${index}`}>Duration:</label>
      <input
        className={styles['durationInput']}
        id={`duration${index}`}
        type="number"
        name={`duration${index}`}
        value={workoutData.duration}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleDurationChange(index, parseInt(e.target.value, 10))
        }
      />
    </div>
  );
};
