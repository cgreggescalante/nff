import {
  createUpload,
  Upload,
  WorkoutType,
  WorkoutTypeToNumber,
} from '@shared-data';
import useCurrentUser from '../providers/useUser';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  const userInfo = useCurrentUser();

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
    const validWorkouts: WorkoutTypeToNumber = {};
    includedWorkouts.forEach((workout) => {
      if (workouts[workout] !== undefined && workouts[workout]! > 0) {
        validWorkouts[workout] = workouts[workout];
      }
    });

    const upload: Upload = {
      userRef: userInfo.ref,
      userFirstName: userInfo.firstName,
      userLastName: userInfo.lastName,
      description,
      workouts: validWorkouts,
      date: new Date(),
    };

    createUpload(upload, userInfo)
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
