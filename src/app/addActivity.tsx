import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Table,
  Textarea,
} from '@mui/joy';
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
import ContentBox from '../components/contentBox';

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

  return (
    <ContentBox maxWidth={500}>
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
                <Typography level={'body-xs'} mt={0}>
                  (
                  {WORKOUT_CONFIG.find((w) => w.name === workout)?.units ===
                  'distance'
                    ? 'miles'
                    : 'minutes'}
                  )
                </Typography>
              </td>
              <td>
                <Input
                  size={'sm'}
                  fullWidth
                  slotProps={{ input: { min: 0 } }}
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
                  style={{ height: '80%' }}
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
          {WORKOUT_CONFIG.filter(
            (workoutType) => !includedWorkouts.includes(workoutType.name)
          ).map((workout, index) => (
            <MenuItem key={index} onClick={addWorkout(workout.name)}>
              <Typography>{workout.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>

      <FormControl sx={{ mb: 3 }}>
        <FormLabel>Description</FormLabel>
        <Textarea
          slotProps={{ textarea: { maxLength: 256 } }}
          placeholder={'Describe your activity...'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={2}
          maxRows={16}
        />
        <FormHelperText>
          {256 - description.length} characters remaining
        </FormHelperText>
      </FormControl>

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
    </ContentBox>
  );
};
