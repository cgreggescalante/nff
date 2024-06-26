import {
  createUpload,
  Upload,
  WORKOUT_CONFIG,
  WorkoutTypeToNumber,
} from '@shared-data';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'common-react';

interface UploadController {
  description: string;
  setDescription: (description: string) => void;

  workouts: WorkoutTypeToNumber;
  includedWorkouts: string[];
  setWorkouts: (workouts: WorkoutTypeToNumber) => void;

  handleDurationChange: (workoutType: string, value: number) => void;
  handleSubmit: () => void;

  addWorkout: (workoutType: string) => () => void;
  removeWorkout: (workoutType: string) => () => void;
}

export default (): UploadController => {
  const userInfo = useAuth();

  const navigate = useNavigate();

  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutTypeToNumber>({});
  const [includedWorkouts, setIncludedWorkouts] = useState<string[]>([]);

  const addWorkout = (workoutType: string) => () => {
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

  const handleDurationChange = (workoutType: string, value: number) => {
    const newWorkouts = { ...workouts };
    newWorkouts[workoutType] = value;
    setWorkouts(newWorkouts);
  };

  const handleSubmit = async () => {
    if (userInfo.user === null || !userInfo.user.displayName) return;

    const validWorkouts: WorkoutTypeToNumber = {};
    const activityPoints: WorkoutTypeToNumber = {};

    WORKOUT_CONFIG.forEach((workout) => {
      if (workouts[workout.name] !== undefined && workouts[workout.name]! > 0) {
        validWorkouts[workout.name] = workouts[workout.name];
        activityPoints[workout.name] =
          workouts[workout.name] * workout.pointRate;
      }
    });

    const upload: Upload = {
      userDisplayName: userInfo.user?.displayName,
      userId: userInfo.user?.uid,
      description,
      activities: validWorkouts,
      activityPoints,
      points: Object.values(activityPoints).reduce(
        (acc, curr) => acc + curr,
        0
      ),
      date: new Date(),
    };

    createUpload(upload)
      .then((_) => {
        setDescription('');
        setWorkouts({});
        setIncludedWorkouts([]);
        navigate('/');
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
