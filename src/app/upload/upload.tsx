import React, { ChangeEvent, useState } from 'react';
import { WorkoutInput } from './workout-input/workout-input';
import {
  createUpload,
  Upload,
  WorkoutType,
  WorkoutTypeNames,
  WorkoutTypeToNumber,
} from '@shared-data';
import { toast } from 'react-toastify';
import useCurrentUser from '../../providers/useUser';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';

const UploadView = () => {
  const userInfo = useCurrentUser();

  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutTypeToNumber>({});
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType | ''>('');

  const handleDurationChange = (workoutType: WorkoutType, value: number) => {
    const newWorkouts = { ...workouts };
    newWorkouts[workoutType] = value;
    setWorkouts(newWorkouts);
  };

  const handleSubmit = async () => {
    const validWorkouts: WorkoutTypeToNumber = {};
    WorkoutTypeNames.forEach((workout) => {
      if (workouts[workout] !== undefined && workouts[workout]! > 0) {
        validWorkouts[workout] = workouts[workout];
      }
    });

    const upload: Upload = {
      userRef: userInfo.ref,
      userFirstName: userInfo.firstName,
      userLastName: userInfo.lastName,
      description,
      workouts: validWorkouts,
      date: new Date(),
    };

    createUpload(upload, userInfo)
      .then((_) => {
        toast.success('Workouts added successfully');
        setDescription('');
        setWorkouts({});
      })
      .catch((error) => {
        console.error('Error while creating upload: ', error);
        toast.error('Could not add workouts');
      });
  };

  const handleAddWorkout = () => {
    if (selectedWorkout) {
      const newWorkouts = { ...workouts };
      newWorkouts[selectedWorkout] = 0;
      setWorkouts(newWorkouts);
      setSelectedWorkout('');
    }
  };

  const deleteWorkoutInput = (workoutType: keyof WorkoutTypeToNumber) => () => {
    const newWorkouts = { ...workouts };
    delete newWorkouts[workoutType];
    setWorkouts(newWorkouts);
  };

  return (
    <>
      <Typography variant="h4">Upload</Typography>

      <TextField
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        label={'Description'}
        multiline
        minRows={2}
        maxRows={16}
      />

      {WorkoutTypeNames.filter(
        (workout) => workouts[workout] !== undefined
      ).map((workout, index) => (
        <WorkoutInput
          key={index}
          index={index}
          workoutType={workout}
          duration={workouts[workout]}
          handleDurationChange={handleDurationChange}
          deleteWorkoutInput={deleteWorkoutInput(workout)}
        />
      ))}

      <FormControl>
        <Select
          value={selectedWorkout}
          defaultValue={''}
          onChange={(e: SelectChangeEvent) =>
            setSelectedWorkout(e.target.value as keyof WorkoutTypeToNumber)
          }
        >
          {WorkoutTypeNames.filter(
            (workout) => workouts[workout] === undefined
          ).map((workout, index) => (
            <MenuItem key={index} value={workout}>
              {workout}
            </MenuItem>
          ))}
        </Select>
        <Button
          disabled={selectedWorkout === undefined}
          onClick={handleAddWorkout}
        >
          Add Workout
        </Button>
      </FormControl>

      <div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default UploadView;
