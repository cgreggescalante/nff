import styles from './workout-input.module.scss';
import React, { ChangeEvent } from "react";
import { Workout, WorkoutTypes } from "@shared-data";

export interface WorkoutProps {
  index: number;
  workoutData: Workout,
  handleWorkoutChange: (index: number, field: keyof Workout, value: string | number) => void;
  handleDelete: (index: number) => void;
}

// Individual workout component
export const WorkoutInput: React.FC<WorkoutProps> = ({ index, workoutData, handleWorkoutChange, handleDelete }) => {
  return (
    <div>
      <button onClick={() => handleDelete(index)}>X</button>
      <label htmlFor={`workoutType${index}`}>Workout Type:</label>
      <select
        id={`workoutType${index}`}
        name={`workoutType${index}`}
        value={workoutData.workoutType ? workoutData.workoutType.toString() : "Run"}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleWorkoutChange(index, 'workoutType', e.target.value)}
      >
        {
          WorkoutTypes.map(workoutType =>
            <option key={workoutType.name} value={workoutType.name}>{ workoutType.name }</option>
          )
        }
      </select>

      <label htmlFor={`duration${index}`}>Duration:</label>
      <input
        className={styles['durationInput']}
        id={`duration${index}`}
        type="number"
        name={`duration${index}`}
        value={workoutData.duration}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleWorkoutChange(index, 'duration', parseInt(e.target.value, 10))}
      />
    </div>
  );
};