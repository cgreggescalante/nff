import { App, initializeApp } from 'firebase-admin/app';
import { QueryDocumentSnapshot, getFirestore } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { Team } from '../../modules/shared/data/src';

const addWorkoutTypeToNumber = (
  a: { [k: string]: number },
  b: { [k: string]: number }
): { [k: string]: number } => {
  const result = { ...a };

  for (const key in b) {
    if (result[key]) {
      result[key] += b[key];
    } else {
      result[key] = b[key];
    }
  }

  return result;
};

let app: App;

export const onUpload = onDocumentCreated('uploads/{uploadId}', (event) => {
  if (!app) {
    app = initializeApp();
  }

  const snapshot = event.data;

  if (!snapshot) {
    logger.error('No data associated with the event');
    return;
  }

  const upload = snapshot.data();

  const firestore = getFirestore();

  return firestore.runTransaction(async (transaction) => {
    // Get all the user's entries
    const entryQuery = firestore
      .collectionGroup('entries')
      .where('userId', '==', upload.userId);

    const entries = await transaction.get(entryQuery);

    const eventSnapshots = await Promise.all(
      entries.docs.map(
        async (entry) => await transaction.get(entry.get('eventRef'))
      )
    );

    const teamSnapshots = (await Promise.all(
      entries.docs.map(async (entry) =>
        entry.get('teamRef')
          ? await transaction.get(entry.get('teamRef'))
          : null
      )
    )) as unknown as QueryDocumentSnapshot<Team>[];

    for (let i = 0; i < entries.size; i++) {
      if (!eventSnapshots[i]) {
        logger.error('Event does not exist');
        continue;
      }

      const eventSnapshot = eventSnapshots[
        i
      ] as unknown as QueryDocumentSnapshot<Event>;
      const entry = entries.docs[i];

      if (
        eventSnapshot.get('startDate') > upload.date ||
        eventSnapshot.get('endDate') < upload.date
      )
        continue;

      // Add the upload to the entries total points and total duration
      transaction.update(entry.ref, {
        activities: addWorkoutTypeToNumber(
          entry.get('activities'),
          upload.activities
        ),
        activityPoints: addWorkoutTypeToNumber(
          entry.get('activityPoints'),
          upload.activityPoints
        ),
        points: entry.get('points') + upload.points,
      });

      if (teamSnapshots[i]) {
        const team = teamSnapshots[i].data();

        transaction.update(teamSnapshots[i].ref, {
          points: team.points + upload.points,
        });
      }
    }
  });
});
