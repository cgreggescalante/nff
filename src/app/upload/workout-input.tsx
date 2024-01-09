import React from 'react';
import { WorkoutType } from '@shared-data';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/joy';

export interface WorkoutProps {
  workoutType: WorkoutType;
  duration: number;
  handleDurationChange: (workoutType: WorkoutType) => (value: number) => void;
  deleteWorkoutInput: () => void;
}

export const WorkoutInput: React.FC<WorkoutProps> = ({
  workoutType,
  duration,
  handleDurationChange,
  deleteWorkoutInput,
}) => (
  <Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ mb: 2 }}>
    {getLabel(workoutType)}
    {getDurationInput(duration, handleDurationChange(workoutType))}
    {getDeleteButton(deleteWorkoutInput)}
  </Stack>
);

const getLabel = (workoutType: WorkoutType) => (
  <Typography variant={'h6'}>{workoutType}</Typography>
);

const getDurationInput = (
  duration: number,
  handleChange: (duration: number) => void
) => (
  <TextField
    label={'Duration'}
    type={'number'}
    fullWidth
    value={duration}
    onChange={(e) => handleChange(parseInt(e.target.value))}
  />
);

const getDeleteButton = (onClick: () => void) => (
  <Button onClick={onClick} style={{ height: '100%' }}>
    <ClearIcon />
  </Button>
);
