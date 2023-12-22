import React from 'react';
import { WorkoutType } from '@shared-data';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface WorkoutProps {
  index: number;
  workoutType: WorkoutType;
  duration: number;
  handleDurationChange: (workoutType: WorkoutType, value: number) => void;
  deleteWorkoutInput: () => void;
}

export const WorkoutInput: React.FC<WorkoutProps> = ({
  index,
  workoutType,
  duration,
  handleDurationChange,
  deleteWorkoutInput,
}) => (
  <Grid container item alignItems={'center'} spacing={1} columns={32}>
    <Grid item xs={3}>
      {getLabel(workoutType)}
    </Grid>

    <Grid item>
      {getDurationInput(duration, (duration) =>
        handleDurationChange(workoutType, duration)
      )}
    </Grid>

    <Grid item xs={1}>
      {getDeleteButton(deleteWorkoutInput)}
    </Grid>
  </Grid>
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
    value={duration}
    onChange={(e) => handleChange(parseInt(e.target.value))}
  />
);

const getDeleteButton = (onClick: () => void) => (
  <Button onClick={onClick} style={{ height: '100%' }}>
    <ClearIcon />
  </Button>
);
