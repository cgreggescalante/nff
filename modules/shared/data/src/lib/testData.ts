import type UserInfo from './models/UserInfo';
import { faker } from '@faker-js/faker';
import type { Event, EventWithUid } from './models/Event';
import UserInfoService from './services/UserInfoService';
import EventService from './services/EventService';
import type Upload from './models/Upload';
import UploadService from './services/UploadService';
import { WorkoutTypeNames, WorkoutTypeToNumber } from './models/WorkoutType';

const generateUser = (): UserInfo => ({
  uid: faker.string.uuid(),
  name: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  role: '',
  entryRefs: [],
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
    name: faker.airline.airline().name + ' Event',
    description: faker.lorem.paragraph(),
    startDate,
    endDate,
    registrationStart,
    registrationEnd,
    registeredUserRefs: [],
    scoringConfiguration: {
      scoringRules: [
        {
          workoutType: 'Run',
          standardRate: 1,
        },
        {
          workoutType: 'Bike',
          standardRate: 1,
        },
        {
          workoutType: 'Ski',
          standardRate: 1,
        },
        {
          workoutType: 'Swim',
          standardRate: 1,
        },
      ],
    },
    teamRefs: [],
  };
};

const generateUpload = (user: UserInfo, workoutCount: number): Upload => {
  const date = new Date();
  date.setDate(date.getDate() + faker.number.int({ min: -30, max: 60 }));

  const workoutTypes = faker.helpers
    .shuffle(WorkoutTypeNames)
    .slice(0, workoutCount);

  const workouts: WorkoutTypeToNumber = {};
  for (const type of workoutTypes) {
    workouts[type] = randomDistribution(1, 50, 10)();
  }

  return {
    user,
    userFirstName: user.name.firstName,
    userLastName: user.name.lastName,
    description: faker.lorem.sentence(),
    date,
    workouts,
  };
};

const randomDistribution =
  (min: number, max: number, average: number) => () => {
    let value = Math.random() * (max - min) + min;

    if (value < average) value += Math.random() * (max - average);
    else value += Math.random() * (average - min);

    return Math.min(Math.max(value, min), max);
  };

export const generateUsers = async (count = 10) => {
  for (let i = 0; i < count; i++) {
    const user = generateUser();
    await UserInfoService.createWithId(user.uid, user);
    console.log(`Added User: ${user.name.firstName} ${user.name.lastName}`);
  }
};

export const generateEvents = async (count = 1) => {
  for (let i = 0; i < count; i++) {
    const event = generateEvent();
    await EventService.create(event);
    console.log(`Added Event: ${event.name}`);
  }
};

export const registerUsersForEvents = async () => {
  console.log('Registering users for events');

  let users: UserInfo[] = [];
  let events: EventWithUid[] = [];

  await Promise.all([
    UserInfoService.list().then((u) => {
      users = u;
      console.log(`Retrieved ${users.length} users`);
    }),
    EventService.list().then((e) => {
      events = e;
      console.log(`Retrieved ${events.length} events`);
    }),
  ]);

  for (const user of users) {
    const toRegister = faker.helpers.arrayElements(
      events,
      Math.round(randomDistribution(1, 4, 1)())
    );

    for (const event of toRegister) {
      await EventService.addUser(event, user);
      console.log(
        `Registered ${user.name.firstName} ${user.name.lastName} for ${event.name}`
      );
    }
  }

  console.log('Finished registering users for events');
};

export const generateUploads = async () => {
  console.log('Generating uploads');

  const users = await UserInfoService.list();

  for (const user of users) {
    const uploadCount = 10;
    for (let i = 0; i < uploadCount; i++) {
      const upload = generateUpload(user, 2);
      await UploadService.createTest(user, upload);
    }
  }

  console.log('Completed generating uploads');
};
