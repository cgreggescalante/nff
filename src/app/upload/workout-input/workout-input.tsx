import React, { ChangeEvent } from 'react';
import { WorkoutType } from '@shared-data';
import { Button, Form, InputGroup } from 'react-bootstrap';

export interface WorkoutProps {
  index: number;
  workoutType: WorkoutType;
  duration: number | undefined;
  handleDurationChange: (workoutType: WorkoutType, value: number) => void;
  deleteWorkoutInput: () => void;
}

export const WorkoutInput: React.FC<WorkoutProps> = ({
  index,
  workoutType,
  duration,
  handleDurationChange,
  deleteWorkoutInput,
}) => {
  return (
    <InputGroup className={'mb-2'}>
      <InputGroup.Text>{workoutType}</InputGroup.Text>

      <Form.Control
        id={`duration${index}`}
        type="number"
        name={`duration${index}`}
        value={duration}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleDurationChange(workoutType, parseInt(e.target.value, 10))
        }
      />
      <Button variant={'danger'} onClick={deleteWorkoutInput}>
        X
      </Button>
    </InputGroup>
  );
};
