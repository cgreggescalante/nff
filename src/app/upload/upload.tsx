import React, { ChangeEvent, useState } from 'react';
import { WorkoutInput } from './workout-input/workout-input';
import { Upload, UploadService, Workout, WorkoutType } from '@shared-data';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const UploadView: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<Workout[]>([Workout.default()]);

  const [error, setError] = useState('');

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

  const addWorkout = () => setWorkouts([...workouts, Workout.default()]);

  const handleSubmit = async () => {
    const validWorkouts = workouts.filter((w) => w.duration > 0);

    if (auth.currentUser != null) {
      await UploadService.createFromComponents(
        auth.currentUser.uid,
        description,
        validWorkouts
      )
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
