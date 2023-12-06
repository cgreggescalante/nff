import { db } from './firebase';
import { faker } from '@faker-js/faker';
import { WorkoutTypeNames, WorkoutTypeToNumber } from '../models/WorkoutType';
import Entry from '../models/Entry';
import { ApplyScoring } from '../models/ScoringConfiguration';
import Event from '../models/Event';
import { FieldValue } from 'firebase-admin/firestore';
import { UserInfoWithMetaData } from '../models/UserInfo';

export const addUpload = async (user: UserInfoWithMetaData, count: number) => {
  // Get the user's entries
  const entries = await db
    .collection('users')
    .doc(user.uid)
    .collection('entries')
    .get();

  await db.runTransaction(async (transaction) => {
    const allWorkouts: WorkoutTypeToNumber[] = [];

    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() + faker.number.int({ min: -60, max: 0 }));

      const workoutTypes = faker.helpers.shuffle(WorkoutTypeNames).slice(0, 2);

      const workouts: WorkoutTypeToNumber = {};
      for (const type of workoutTypes) {
        workouts[type] = faker.number.int({ min: 1, max: 25 });
      }

      allWorkouts.push(workouts);

      transaction.create(db.collection(`users/${user.uid}/uploads`).doc(), {
        date,
        description: faker.lorem.sentence(),
        userRef: db.doc(`users/${user.uid}`),
        workouts,
        userFirstName: user.firstName,
        userLastName: user.lastName,
      });
    }

    for (const entry of entries.docs) {
      const entryData = entry.data() as Entry;

      if (!entryData.teamRef) continue;

      const teamRef = db.doc(entryData.teamRef.path);
      const eventRef = db.doc(entryData.eventRef.path);
      const event = (await eventRef.get()).data() as Event;

      const points = allWorkouts.reduce(
        (acc, curr) => acc + ApplyScoring(event.scoringRules, curr),
        0
      );

      transaction.update(teamRef, {
        points: FieldValue.increment(points),
      });
    }
  });
};
