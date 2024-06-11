import { onDocumentDeleted } from 'firebase-functions/v2/firestore';
import { App, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore';
import { Team, WorkoutTypeToNumber } from '../../modules/shared/data/src';
import * as logger from 'firebase-functions/logger';

let app: App;

export const onUploadDelete = onDocumentDeleted(
  'uploads/{uploadId}',
  async (event) => {
    logger.info('onUploadDelete', event);
    if (!app) app = initializeApp();

    const snapshot = event.data;

    if (!snapshot) {
      logger.error('No data associated with the event');
      return;
    }

    const upload = snapshot.data();

    const firestore = getFirestore();

    return firestore.runTransaction(async (transaction) => {
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
        const entry = entries.docs[i].data();

        if (
          eventSnapshot.get('startDate') > upload.date ||
          eventSnapshot.get('endDate') < upload.date
        )
          continue;

        const updatedActivities = {} as WorkoutTypeToNumber;
        const updatedPoints = {} as WorkoutTypeToNumber;

        for (const key in upload.activities) {
          updatedActivities[key] =
            entry['activities'][key] - upload.activities[key];
        }

        for (const key in upload.activityPoints) {
          updatedPoints[key] =
            entry['activityPoints'][key] - upload.activityPoints[key];
        }

        transaction.update(entries.docs[i].ref, {
          activities: updatedActivities,
          activityPoints: updatedPoints,
          points: entry['points'] - upload.points,
        });

        if (teamSnapshots[i]) {
          const team = teamSnapshots[i].data();

          transaction.update(teamSnapshots[i].ref, {
            points: team.points - upload.points,
          });
        }
      }
    });
  }
);
