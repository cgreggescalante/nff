import { faker } from '@faker-js/faker';
import { addWorkoutTypeToNumber, WorkoutTypeToNumber } from '../models';
import { simpleCreateUpload, updatePoints } from '../services/create';
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

    const workouts: WorkoutTypeToNumber = {};
    for (const type of workoutTypes) {
      workouts[type.name] = faker.number.int({ min: 1, max: 25 });
    }

    totalDuration = addWorkoutTypeToNumber(totalDuration, workouts);

    await simpleCreateUpload({
      date,
      description: faker.lorem.sentence(),
      userId: user.uid,
      workouts,
      userDisplayName: user.displayName,
    });
  }

  await updatePoints(user.uid, totalDuration);
};
