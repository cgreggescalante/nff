import React, { ChangeEvent, useState } from 'react';
import {
  createUpload,
  Upload,
  WorkoutType,
  WorkoutTypeNames,
  WorkoutTypeToNumber,
} from '@shared-data';
import { toast } from 'react-toastify';
import useCurrentUser from '../../providers/useUser';
import { Button, Table } from '@mui/joy';
import TextField from '@mui/material/TextField';
import Typography from '@mui/joy/Typography';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/joy/Box';
import ClearIcon from '@mui/icons-material/Clear';

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
      <Typography level="h2" sx={{ mb: 3 }}>
        Add Activity
      </Typography>

      <Table sx={{ mb: 2 }}>
        <thead>
          <tr>
            <th>Sport</th>
            <th>Duration</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {WorkoutTypeNames.filter(
            (workout) => workouts[workout] !== undefined
          ).map((workout, index) => (
            <tr key={index}>
              <td>
                <Typography level={'body-md'}>{workout}</Typography>
              </td>
              <td>
                <TextField
                  size={'small'}
                  fullWidth
                  type={'number'}
                  value={workouts[workout]}
                  onChange={(e) =>
                    handleDurationChange(workout)(parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <Button
                  onClick={deleteWorkoutInput(workout)}
                  style={{ height: '100%' }}
                >
                  <ClearIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
            <MenuItem key={index} onClick={handleAddWorkout(workout)}>
              <Typography>{workout}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>

      <TextField
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        label={'Description'}
        fullWidth
        multiline
        minRows={2}
        maxRows={16}
        sx={{ mb: 3 }}
      />

      <Box>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button
          sx={{ ml: 1 }}
          variant={'plain'}
          onClick={() => {
            setDescription('');
            setWorkouts({});
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default UploadView;
