import React, { ChangeEvent, useEffect, useState } from 'react';
import { WorkoutInput } from '@shared-ui';
import { UploadService, Workout, WorkoutType } from '@shared-data';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UploadView: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<Workout[]>([Workout.default()]);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() =>
    onAuthStateChanged(auth, (user) => (user ? {} : navigate('/login')))
  );

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
      if (
        !(await UploadService.create(
          auth.currentUser.uid,
          description,
          validWorkouts
        ))
      ) {
        setError('Could not add workouts');
      } else {
        // TODO: Add message
        navigate('/');
      }
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default UploadView;
