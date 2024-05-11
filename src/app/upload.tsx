import React, { ChangeEvent } from 'react';
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
import useUploadController from '../controllers/useUploadController';
import { WORKOUT_CONFIG } from '@shared-data';

export default () => {
  const {
    description,
    setDescription,
    workouts,
    includedWorkouts,
    setWorkouts,
    handleDurationChange,
    handleSubmit,
    addWorkout,
    removeWorkout,
  } = useUploadController();

  // TODO: add flag to tell the user if submission is still being processed
  // TODO: clear form after submission

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
          {includedWorkouts.map((workout, index) => (
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
                    handleDurationChange(workout, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <Button
                  onClick={removeWorkout(workout)}
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
            includedWorkouts.length === Object.values(WORKOUT_CONFIG).length
          }
        >
          Add Workout
        </MenuButton>
        <Menu>
          {Object.values(WORKOUT_CONFIG)
            .filter(
              (workoutType) => !includedWorkouts.includes(workoutType.name)
            )
            .map((workout, index) => (
              <MenuItem key={index} onClick={addWorkout(workout.name)}>
                <Typography>{workout.name}</Typography>
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
