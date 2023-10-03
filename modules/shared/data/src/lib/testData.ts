import type UserInfo from './models/UserInfo';
import { faker } from '@faker-js/faker';
import type Event from './models/Event';
import UserInfoService from './services/UserInfoService';
import EventService from './services/EventService';
import type Upload from './models/Upload';
import { WorkoutTypes } from './WorkoutType';
import UploadService from './services/UploadService';

const generateUser = (): UserInfo => ({
  uid: faker.string.uuid(),
  name: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  role: '',
  registeredEvents: [],
  totalPoints: 0,
});

const generateEvent = (): Event => {
  const rs = faker.number.int({ min: -30, max: 30 });
  const rLength = faker.number.int({ min: 2, max: 30 });
  const eventLength = faker.number.int({ min: 7, max: 70 });

  const registrationStart = new Date();
  registrationStart.setDate(registrationStart.getDate() + rs);
  const registrationEnd = new Date();
  registrationEnd.setDate(registrationEnd.getDate() + rs + rLength);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + rs + rLength + 1);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + rs + rLength + 1 + eventLength);

  return {
    uid: faker.string.uuid(),
    name: faker.airline.airline().name + ' Event',
    description: faker.lorem.paragraph(),
    startDate,
    endDate,
    registrationStart,
    registrationEnd,
    registeredUsers: [],
  };
};

const generateUpload = (user: UserInfo, workoutCount: number): Upload => {
  const date = new Date();
  date.setDate(date.getDate() + faker.number.int({ min: -30, max: 60 }));

  return {
    user,
    description: faker.lorem.sentence(),
    date,
    workouts: Array.from({ length: workoutCount }).map((_) => {
      const workoutType = faker.helpers.objectValue(WorkoutTypes);
      const duration = randomDistribution(1, 50, 10)();
      return {
        workoutType,
        duration,
        points: workoutType.pointsFunction(duration),
      };
    }),
  };
};

const randomDistribution =
  (min: number, max: number, average: number) => () => {
    let value = Math.random() * (max - min) + min;

    if (value < average) value += Math.random() * (max - average);
    else value += Math.random() * (average - min);

    return Math.min(Math.max(value, min), max);
  };

export const generateTestData = async () => {
  const scale = 3;

  const uploadDistribution = randomDistribution(0, 75, 20);
  const workoutDistribution = randomDistribution(1, 3, 2);
  const eventDistribution = randomDistribution(0, 4, 1);

  const users: UserInfo[] = [];

  for (let i = 0; i < scale * 10; i++) {
    const user = generateUser();
    await UserInfoService.createWithId(user.uid, user);
    users.push(user);
  }

  const events: Event[] = [];

  for (let i = 0; i < scale; i++) {
    const event = generateEvent();
    if (event.uid) {
      await EventService.createWithId(event.uid, event);
      events.push(event);
    }
  }

  for (const user of users) {
    console.log(user.name);
    for (let i = 0; i < Math.round(uploadDistribution()); i++) {
      const upload = generateUpload(user, workoutDistribution());
      await UploadService.createTest(user, upload);
    }

    const toRegister = faker.helpers.arrayElements(
      events,
      Math.round(eventDistribution())
    );

    for (const event of toRegister) {
      await EventService.addUser(event, user);
    }
  }

  console.log('Completed');
};
