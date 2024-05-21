import { Event } from '../models';
import { createEvent } from '../services/create';
import { randAirline, randParagraph } from '@ngneat/falso';

export const addEvent = async () => {
  const rs = Math.round(Math.random() * 60 - 30);
  const rLength = Math.round(Math.random() * 28 + 2);
  const eventLength = Math.round(Math.random() * 63 + 7);

  const registrationStart = new Date();
  registrationStart.setDate(registrationStart.getDate() + rs);
  const registrationEnd = new Date();
  registrationEnd.setDate(registrationEnd.getDate() + rs + rLength);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + rs + rLength + 1);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + rs + rLength + 1 + eventLength);

  const event: Event = {
    name: randAirline() + ' TEST EVENT',
    description: randParagraph(),
    startDate,
    endDate,
    registrationStart,
    registrationEnd,
    entryRefs: [],
  };

  await createEvent(event);
};
