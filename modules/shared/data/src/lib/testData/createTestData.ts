import { addUser } from './00100_addUser';
import { addEvent } from './00200_addEvent';
import { db } from './admin-firebase';
import { registerUserForEvent } from './00300_registerUserForEvent';
import { addTeam } from './00400_addTeam';
import { UserInfo } from '../models';
import { Entry } from '../models';
import { addUserToTeam } from './00500_addUserToTeam';
import { addUpload } from './00600_addUpload';

const createTestData = async () => {
  console.log('Creating Users');
  for (let i = 0; i < 50; i++) {
    await addUser();
  }

  console.log('Creating Events');
  for (let i = 0; i < 2; i++) {
    await addEvent();
  }

  console.log('Registering Users for Events');
  // Register Users for Events
  let users = await db.collection('users').get();
  let events = await db.collection('events').get();

  for (const user of users.docs) {
    const event = events.docs[Math.floor(Math.random() * events.docs.length)];

    await registerUserForEvent({ uid: user.id }, { uid: event.id });
  }

  events = await db.collection('events').get();

  console.log('Creating Teams');
  // Create Teams
  for (const event of events.docs) {
    const entries = await db
      .collectionGroup('entries')
      .where('eventRef', '==', event.ref)
      .get();

    for (const entry of entries.docs.slice(0, 2)) {
      const entryData = entry.data() as Entry;
      const user = (
        await db.collection('users').doc(entryData.userRef.id).get()
      ).data() as UserInfo;

      console.log('Adding Team');
      await addTeam(
        { uid: entryData.userRef.id, firstName: user.firstName },
        { uid: event.id }
      );
    }

    // Add Users to Teams
    console.log('Adding users to team');
    const teams = await db
      .collection('events')
      .doc(event.id)
      .collection('teams')
      .get();

    for (const entry of entries.docs) {
      const team = teams.docs[Math.floor(Math.random() * teams.docs.length)];
      const entryData = entry.data() as Entry;

      await addUserToTeam(event.id, team.id, entryData.userRef.id);
    }
  }

  users = await db.collection('users').get();

  // Add Uploads
  for (const user of users.docs) {
    await addUpload({ ...(user.data() as UserInfo), uid: user.id }, 25);
  }
};

createTestData().then(() => console.log('Done'));
