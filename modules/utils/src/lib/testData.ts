import * as fs from 'fs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { faker } from '@faker-js/faker';

export interface User {
  firstName: string;
  lastName: string;
  id: number;
}

export interface Upload {
  id: number;
  user: User;
  date: Date;
  workouts: Workout[];
}

export interface Workout {
  workoutType: WorkoutType;
  duration: number;
  points: number;
  uploadId: number;
  userId: number;
  id: number;
}

export enum WorkoutType {
  Run = 'Run',
  Bike = 'Bike',
  Swim = 'Swim',
  Ski = 'Ski',
}

const generateDynamicJSONData = (): string => {
  const users: User[] = Array.from({ length: 10 }).map((_, index) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    id: index,
  }));

  const uploads: Upload[] = users
    .map((user) => {
      return Array.from({ length: 10 }).map((_, ui) => ({
        user,
        id: user.id * 10 + ui,
        date: faker.date.past({ years: 1 }),
        workouts: Array.from({ length: 2 }).map((_, wi) => ({
          workoutType: faker.helpers.enumValue(WorkoutType),
          duration: faker.number.int({ min: 1, max: 100 }),
          points: faker.number.int({ min: 1, max: 20 }),
          uploadId: user.id * 10 + ui,
          userId: user.id,
          id: (user.id * 10 + ui) * 2 + wi,
        })),
      }));
    })
    .flat();

  const workouts: Workout[] = uploads.map((upload) => upload.workouts).flat();

  return JSON.stringify({ users, uploads, workouts }, null, 2); // Pretty-print the JSON data
};

fs.writeFile('../../../../testData.json', generateDynamicJSONData(), (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } else {
    console.log('JSON data has been written to testData.json');
  }
});
