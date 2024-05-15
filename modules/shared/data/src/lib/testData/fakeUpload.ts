import { faker } from '@faker-js/faker';
import { addWorkoutTypeToNumber, WorkoutTypeToNumber } from '../models';
import { createUpload, updatePoints } from '../services/create';
import { WORKOUT_CONFIG } from '../CONFIG';

export const addUpload = async (
  user: { uid: string; displayName: string },
  count: number
) => {
  let totalDuration: WorkoutTypeToNumber = {};
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + faker.number.int({ min: -60, max: 0 }));

    const workoutTypes = faker.helpers
      .shuffle(Object.values(WORKOUT_CONFIG))
      .slice(0, 2);

    const activities: WorkoutTypeToNumber = {};
    for (const type of workoutTypes) {
      activities[type.name] = faker.number.int({ min: 1, max: 25 });
    }

    const activityPoints: WorkoutTypeToNumber = {};
    for (const type of workoutTypes) {
      activityPoints[type.name] = type.pointRate * activities[type.name];
    }

    totalDuration = addWorkoutTypeToNumber(totalDuration, activities);

    await createUpload({
      date,
      description: faker.lorem.sentence(),
      userId: user.uid,
      activities,
      activityPoints,
      points: Object.values(activityPoints).reduce((a, b) => a + b, 0),
      userDisplayName: user.displayName,
    });
  }

  await updatePoints(user.uid, totalDuration);
};
