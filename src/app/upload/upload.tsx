import React, { ChangeEvent, useEffect, useState } from 'react';
import { WorkoutInput } from '@shared-ui';
import { Workout, WorkoutTypeFromName, WorkoutTypes } from "@shared-data";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UploadView: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<Workout[]>([
    { workoutType: WorkoutTypes[0], duration: 0, points: 0 },
  ]);

  const navigate = useNavigate();

  useEffect(() =>
    onAuthStateChanged(auth, (user) => (user ? {} : navigate('/nff/login')))
  );

  const handleWorkoutChange = (
    index: number,
    field: keyof Workout,
    value: string | number
  ) => {
    const newWorkouts = [...workouts];
    newWorkouts[index][field] = value;
    setWorkouts(newWorkouts);
  };

  const deleteWorkout = (index: number) =>
    setWorkouts([...workouts.slice(0, index), ...workouts.slice(index + 1)]);

  const addWorkout = () =>
    setWorkouts([
      ...workouts,
      { workoutType: WorkoutTypes[0], duration: 0, points: 0 },
    ]);

  const handleSubmit = async () => {
    const validWorkouts = workouts.filter((w) => w.duration > 0);

    if (auth.currentUser != null) {
      const userRef = doc(db, 'users', auth.currentUser.uid);

      const uploadRef = await addDoc(collection(db, 'uploads'), {
        description,
        date: new Date(),
        user: userRef,
      });

      const workoutRefs = Array.from({ length: validWorkouts.length });

      for (let i = 0; i < validWorkouts.length; i++) {
        const workout = validWorkouts[i];
        const workoutType = typeof workout.workoutType == "string" ? WorkoutTypeFromName[workout.workoutType] : workout.workoutType;

        workoutRefs[i] = await addDoc(collection(db, 'workouts'), {
          upload: uploadRef,
          user: userRef,
          workoutType: workoutType.name,
          duration: workout.duration,
          points: workoutType.pointsFunction(
            workout.duration
          ),
        });
      }

      updateDoc(uploadRef, {
        workouts: workoutRefs,
      }).then(() => console.log("Updated upload"));
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
          handleWorkoutChange={handleWorkoutChange}
          handleDelete={() => deleteWorkout(index)}
        />
      ))}

      <button onClick={addWorkout}>Add Workout</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UploadView;
