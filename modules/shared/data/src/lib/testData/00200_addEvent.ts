import { db } from './firebase';
import { faker } from '@faker-js/faker';
import Event from '../models/Event';

export const addEvent = async () => {
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

  const event: Event = {
    name: faker.airline.airline().name + ' Event',
    description: faker.lorem.paragraph(),
    startDate,
    endDate,
    registrationStart,
    registrationEnd,
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
    entryRefs: [],
  };

  await db.collection('events').add(event);
};
