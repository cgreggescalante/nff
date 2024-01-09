import React, { ChangeEvent, useState } from 'react';
import { WorkoutInput } from './workout-input';
import {
  createUpload,
  Upload,
  WorkoutType,
  WorkoutTypeNames,
  WorkoutTypeToNumber,
} from '@shared-data';
import { toast } from 'react-toastify';
import useCurrentUser from '../../providers/useUser';
import { Button } from '@mui/joy';
import TextField from '@mui/material/TextField';
import Typography from '@mui/joy/Typography';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/joy/Box';

const UploadView = () => {
  const userInfo = useCurrentUser();

  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutTypeToNumber>({});

  const handleDurationChange =
    (workoutType: WorkoutType) => (value: number) => {
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

    console.log(validWorkouts);

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

  const handleAddWorkout = (workoutType: WorkoutType) => () => {
    const newWorkouts = { ...workouts };
    newWorkouts[workoutType] = 0;
    setWorkouts(newWorkouts);
  };

  const deleteWorkoutInput = (workoutType: keyof WorkoutTypeToNumber) => () => {
    const newWorkouts = { ...workouts };
    delete newWorkouts[workoutType];
    setWorkouts(newWorkouts);
  };

  return (
    <Box style={{ maxWidth: '500px' }}>
      <Typography level="h2">Upload</Typography>

      <TextField
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        label={'Description'}
        fullWidth
        multiline
        minRows={2}
        maxRows={16}
        sx={{ mb: 3, mt: 3 }}
      />

      {WorkoutTypeNames.filter(
        (workout) => workouts[workout] !== undefined
      ).map((workout, index) => (
        <WorkoutInput
          key={index}
          workoutType={workout}
          duration={workouts[workout] ? workouts[workout]! : 0}
          handleDurationChange={handleDurationChange}
          deleteWorkoutInput={deleteWorkoutInput(workout)}
        />
      ))}

      <Dropdown>
        <MenuButton
          sx={{ mb: 2 }}
          endDecorator={<ArrowDropDown />}
          disabled={
            WorkoutTypeNames.filter(
              (workout) => workouts[workout] === undefined
            ).length === 0
          }
        >
          Add Workout
        </MenuButton>
        <Menu>
          {WorkoutTypeNames.filter(
            (workout) => workouts[workout] === undefined
          ).map((workout, index) => (
            <MenuItem key={index}>
              <Typography onClick={handleAddWorkout(workout)}>
                {workout}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>

      <Box>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default UploadView;
