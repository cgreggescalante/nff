import { addEvent } from './fakeEvent';
import { addUpload } from './fakeUpload';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { User } from '@firebase/auth';
import { randFullName } from '@ngneat/falso';
import {
  getEntriesByEvent,
  getTeamsByEvent,
  listEvents,
} from '../services/read';
import {
  createEvent,
  createTeamByOwner,
  registerUserForEvent,
} from '../services/create';
import { addTeamMember } from '../services/update';
import { DIVISIONS } from '../CONFIG';

const users: { uid: string; displayName: string }[] = [];

export const createTestData = async () => {
  console.log('Creating Users');

  for (let i = 0; i < 25; i++) {
    users.push({ uid: `user-${i}`, displayName: randFullName() });
  }

  console.log('Creating Events');
  for (let i = 0; i < 2; i++) {
    await addEvent();
  }

  console.log('Registering Users for Events');
  // Register Users for Events
  const events = await listEvents();

  for (const user of users) {
    const event = events[Math.floor(Math.random() * events.length)];

    await registerUserForEvent(event, user as User, 500, 'Upperclassman');
  }

  console.log('Creating Teams');
  // Create Teams
  for (const event of events) {
    const entries = await getEntriesByEvent(event);

    for (const entry of entries.slice(0, 2)) {
      console.log('Adding Team');
      await createTeamByOwner(event, entry);
    }

    // Add Users to Teams
    console.log('Adding users to team');
    const teams = await getTeamsByEvent(event.uid);

    for (const entry of entries.slice(2)) {
      const team = teams[Math.floor(Math.random() * teams.length)];

      await addTeamMember(team, entry);
    }
  }

  console.log('Complete');
};

export const createUploads = async () => {
  console.log('Adding uploads');
  for (const user of users) {
    console.log(user.displayName);
    await addUpload(user, 10);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log('Complete');
};

export const createDraftTestData = async () => {
  const users = Array.from({ length: 50 }, (_, i) => ({
    uid: `draft-test-${i}`,
    displayName: randFullName(),
  }));

  const event = await createEvent({
    name: 'Draft Event',
    description: 'Draft Event Description',
    startDate: new Date(),
    endDate: new Date(),
    registrationStart: new Date(),
    registrationEnd: new Date(),
    entryRefs: [],
  });

  const entries = [];
  for (let i = 0; i < users.length; i++) {
    const entry = await registerUserForEvent(
      event,
      users[i] as User,
      100,
      DIVISIONS[Math.floor(Math.random() * DIVISIONS.length)].value
    );
    entries.push(entry);
  }

  for (let i = 0; i < 4; i++) {
    await createTeamByOwner(event, entries[i]);
  }
};
