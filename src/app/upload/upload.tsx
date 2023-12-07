import React, { ChangeEvent, useState } from 'react';
import { WorkoutInput } from './workout-input/workout-input';
import {
  auth,
  createUpload,
  readUser,
  Upload,
  WorkoutType,
  WorkoutTypeNames,
  WorkoutTypeToNumber,
} from '@shared-data';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UploadView = () => {
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutTypeToNumber>({});
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>();

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

    if (auth.currentUser) {
      const user = await readUser(auth.currentUser.uid);

      if (!user) return;

      const upload: Upload = {
        userRef: user.ref,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        description,
        workouts: validWorkouts,
        date: new Date(),
      };

      createUpload(upload, user)
        .then((_) => {
          toast.success('Workouts added successfully');
          setDescription('');
          setWorkouts({});
        })
        .catch((error) => {
          console.error('Error while creating upload: ', error);
          toast.error('Could not add workouts');
        });
    }
  };

  const handleAddWorkout = () => {
    if (selectedWorkout) {
      const newWorkouts = { ...workouts };
      newWorkouts[selectedWorkout] = 0;
      setWorkouts(newWorkouts);
      setSelectedWorkout(undefined);
    }
  };

  const deleteWorkoutInput = (workoutType: keyof WorkoutTypeToNumber) => () => {
    const newWorkouts = { ...workouts };
    delete newWorkouts[workoutType];
    setWorkouts(newWorkouts);
  };

  return (
    <>
      <h1>Upload</h1>

      <InputGroup className={'mb-2'}>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control
          as={'textarea'}
          id="description"
          name="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
      </InputGroup>

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

      <InputGroup className={'mb-2'}>
        <InputGroup.Text>Workout Type</InputGroup.Text>
        <Form.Select
          value={selectedWorkout}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedWorkout(e.target.value as keyof WorkoutTypeToNumber)
          }
        >
          <option value={undefined}></option>
          {WorkoutTypeNames.filter(
            (workout) => workouts[workout] === undefined
          ).map((workout, index) => (
            <option key={index} value={workout}>
              {workout}
            </option>
          ))}
        </Form.Select>
        <Button
          disabled={selectedWorkout === undefined}
          onClick={handleAddWorkout}
        >
          Add Workout
        </Button>
      </InputGroup>

      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default UploadView;
