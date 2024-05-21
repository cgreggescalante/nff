import { addWorkoutTypeToNumber, WorkoutTypeToNumber } from '../models';
import { createUpload, updatePoints } from '../services/create';
import { WORKOUT_CONFIG } from '../CONFIG';
import { rand, randSentence } from '@ngneat/falso';

export const addUpload = async (
  user: { uid: string; displayName: string },
  count: number
) => {
  let totalDuration: WorkoutTypeToNumber = {};
  let totalActivityPoints: WorkoutTypeToNumber = {};

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * -60));

    const workoutTypes = rand(Object.values(WORKOUT_CONFIG), { length: 2 });

    const activities: WorkoutTypeToNumber = {};
    for (const type of workoutTypes) {
      activities[type.name] = Math.round(Math.random() * 30 + 1);
    }

    const activityPoints: WorkoutTypeToNumber = {};
    for (const type of workoutTypes) {
      activityPoints[type.name] = type.pointRate * activities[type.name];
    }

    totalDuration = addWorkoutTypeToNumber(totalDuration, activities);
    totalActivityPoints = addWorkoutTypeToNumber(
      activityPoints,
      totalActivityPoints
    );

    await createUpload({
      date,
      description: randSentence(),
      userId: user.uid,
      activities,
      activityPoints,
      points: Object.values(activityPoints).reduce((a, b) => a + b, 0),
      userDisplayName: user.displayName,
    });
  }

  await updatePoints(user.uid, totalDuration, totalActivityPoints);
};
