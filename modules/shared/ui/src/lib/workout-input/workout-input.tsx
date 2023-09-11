import styles from './workout-input.module.scss';
import React, { ChangeEvent } from "react";

export interface WorkoutData {
  type: string;
  duration: number;
}

export interface WorkoutProps {
  index: number;
  handleWorkoutChange: (index: number, field: keyof WorkoutData, value: string | number) => void;
}

// Individual workout component
export const WorkoutInput: React.FC<WorkoutProps> = ({ index, handleWorkoutChange }) => {
  const handleSelectOrInputChange = (field: keyof WorkoutData, value: string | number) => {
    handleWorkoutChange(index, field, value);
  };

  return (
    <div>
      <label htmlFor={`workoutType${index}`}>Workout Type:</label>
      <select
        id={`workoutType${index}`}
        name={`workoutType${index}`}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectOrInputChange('type', e.target.value)}
      >
        <option value="Running">Running</option>
        <option value="Swimming">Swimming</option>
        <option value="Cycling">Cycling</option>
      </select>

      <label htmlFor={`duration${index}`}>Duration:</label>
      <input
        className={styles['durationInput']}
        id={`duration${index}`}
        type="number"
        name={`duration${index}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectOrInputChange('duration', parseInt(e.target.value, 10))}
      />
    </div>
  );
};