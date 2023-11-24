import React, { ChangeEvent, useState } from 'react';
import { WorkoutInput } from './workout-input/workout-input';
import {
  UploadService,
  WorkoutType,
  WorkoutTypeNames,
  WorkoutTypeToNumber,
} from '@shared-data';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext';

const UploadView = () => {
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutTypeToNumber>({
    Run: 0,
    Ski: 0,
    Swim: 0,
    Bike: 0,
  });

  const [error, setError] = useState('');
  const { user } = useUser();

  const navigate = useNavigate();

  const handleDurationChange = (workoutType: WorkoutType, value: number) => {
    const newWorkouts = { ...workouts };
    newWorkouts[workoutType] = value;
    setWorkouts(newWorkouts);
  };

  const handleSubmit = () => {
    console.log('submitting', auth.currentUser, user);

    const validWorkouts: WorkoutTypeToNumber = {};
    WorkoutTypeNames.forEach((workout) => {
      if (workouts[workout] !== undefined && workouts[workout] > 0) {
        validWorkouts[workout] = workouts[workout];
      }
    });

    if (auth.currentUser && user) {
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
      {WorkoutTypeNames.map((workout, index) => (
        <WorkoutInput
          key={index}
          index={index}
          workoutType={workout}
          duration={workouts[workout]}
          handleDurationChange={handleDurationChange}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
    </>
  );
};

export default UploadView;
