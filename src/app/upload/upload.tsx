import React, { ChangeEvent, useEffect, useState } from 'react';
import { WorkoutInput } from './workout-input/workout-input';
import type { Workout } from '@shared-data';
import { DefaultWorkout, UploadService, WorkoutType } from '@shared-data';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext';

const UploadView = () => {
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<Workout[]>([DefaultWorkout()]);

  const [error, setError] = useState('');
  const { user } = useUser();

  const navigate = useNavigate();

  const handleWorkoutTypeChange = (index: number, value: WorkoutType) => {
    const newWorkouts = [...workouts];
    console.log(value);
    newWorkouts[index].workoutType = value;
    setWorkouts(newWorkouts);
  };

  const handleDurationChange = (index: number, value: number) => {
    const newWorkouts = [...workouts];
    newWorkouts[index].duration = value;
    setWorkouts(newWorkouts);
  };

  const deleteWorkout = (index: number) =>
    setWorkouts([...workouts.slice(0, index), ...workouts.slice(index + 1)]);

  const addWorkout = () => setWorkouts([...workouts, DefaultWorkout()]);

  const handleSubmit = () => {
    console.log('submitting', auth.currentUser, user);
    const validWorkouts = workouts.filter((w) => w.duration > 0);

    if (auth.currentUser && user) {
      console.log('creating upload');
      UploadService.createFromComponents(user, description, validWorkouts)
        .then((_) => navigate('/')) // TODO: Add message
        .catch((error) => {
          console.error('Error while creating upload: ', error);
          setError('Could not add workouts');
        });
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      />

      {workouts.map((workout, index) => (
        <WorkoutInput
          key={index}
          index={index}
          workoutData={workout}
          handleWorkoutTypeChange={handleWorkoutTypeChange}
          handleDurationChange={handleDurationChange}
          handleDelete={() => deleteWorkout(index)}
        />
      ))}

      <button onClick={addWorkout}>Add Workout</button>
      <button onClick={handleSubmit}>Submit</button>

      {error && <p>{error}</p>}
    </>
  );
};

export default UploadView;
