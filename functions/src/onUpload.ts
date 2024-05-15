import { App, initializeApp } from 'firebase-admin/app';
import { getFirestore, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

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

    for (const entry of entries.docs) {
      const eventSnapshot = (await transaction.get(
        entry.get('eventRef')
      )) as unknown as QueryDocumentSnapshot;
      if (!eventSnapshot.exists) {
        logger.error('Event does not exist');
        continue;
      }

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

      // If the entry has a team, update the team's points
      if (entry.get('teamRef')) {
        const team: any = (
          await transaction.get(entry.get('teamRef'))
        ).docs[0].data();

        transaction.update(team.ref, {
          points: team.points + upload.points,
        });
      }
    }
  });
});
