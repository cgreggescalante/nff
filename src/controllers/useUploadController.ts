import {
  createUpload,
  Upload,
  WorkoutType,
  WorkoutTypeToNumber,
} from '@shared-data';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../providers/useAuth';

interface UploadController {
  description: string;
  setDescription: (description: string) => void;

  workouts: WorkoutTypeToNumber;
  includedWorkouts: WorkoutType[];
  setWorkouts: (workouts: WorkoutTypeToNumber) => void;

  handleDurationChange: (workoutType: WorkoutType, value: number) => void;
  handleSubmit: () => void;

  addWorkout: (workoutType: WorkoutType) => () => void;
  removeWorkout: (workoutType: WorkoutType) => () => void;
}

export default (): UploadController => {
  const userInfo = useAuth();

  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutTypeToNumber>({});
  const [includedWorkouts, setIncludedWorkouts] = useState<WorkoutType[]>([]);

  const addWorkout = (workoutType: WorkoutType) => () => {
    const newWorkouts = { ...workouts };
    newWorkouts[workoutType] = 0;
    setWorkouts(newWorkouts);
    setIncludedWorkouts([...includedWorkouts, workoutType]);
  };

  const removeWorkout = (workoutType: keyof WorkoutTypeToNumber) => () => {
    const newWorkouts = { ...workouts };
    delete newWorkouts[workoutType];
    setWorkouts(newWorkouts);
    setIncludedWorkouts(
      includedWorkouts.filter((workout) => workout !== workoutType)
    );
  };

  const handleDurationChange = (workoutType: WorkoutType, value: number) => {
    const newWorkouts = { ...workouts };
    newWorkouts[workoutType] = value;
    setWorkouts(newWorkouts);
  };

  const handleSubmit = async () => {
    if (userInfo.user === null || !userInfo.user.displayName) return;

    const validWorkouts: WorkoutTypeToNumber = {};
    includedWorkouts.forEach((workout) => {
      if (workouts[workout] !== undefined && workouts[workout]! > 0) {
        validWorkouts[workout] = workouts[workout];
      }
    });

    const upload: Upload = {
      userDisplayName: userInfo.user?.displayName,
      userId: userInfo.user?.uid,
      description,
      workouts: validWorkouts,
      date: new Date(),
    };

    createUpload(upload, userInfo.user)
      .then((_) => {
        setDescription('');
        setWorkouts({});
        toast.success('Workouts added successfully');
      })
      .catch((error) => {
        console.error('Error while creating upload: ', error);
        toast.error('Could not add workouts');
      });
  };

  return {
    description,
    setDescription,
    workouts,
    includedWorkouts,
    setWorkouts,
    handleDurationChange,
    handleSubmit,
    addWorkout,
    removeWorkout,
  };
};
