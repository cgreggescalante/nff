import {
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type Upload from '../models/Upload';
import UserInfoService from './UserInfoService';
import type UserInfo from '../models/UserInfo';

import { addWorkoutTypeToNumber } from '../models/WorkoutType';
import { EntryCollectionRef, UploadCollectionRef } from './CollectionRefs';
import { doc } from '@firebase/firestore';
import { EntryWithUid } from '../models/Entry';
import { ApplyScoring } from '../models/ScoringConfiguration';
import { readEvent } from './EventService';

export const createUpload = async (upload: Upload, user: UserInfo) => {
  return runTransaction(db, async (transaction) => {
    const entries: EntryWithUid[] = [];

    for (const entryRef of user.entryRefs) {
      const entry = (await transaction.get(entryRef)).data();
      if (entry) entries.push({ ...entry, uid: entryRef.id });
    }

    for (const entry of entries) {
      const event = await readEvent(entry.eventRef.id);

      if (!event) continue;

      const points = ApplyScoring(event.scoringConfiguration, upload.workouts);

      transaction.update(doc(EntryCollectionRef, entry.uid), {
        duration: addWorkoutTypeToNumber(entry.duration, upload.workouts),
        points: entry.points + points,
      });

      if (entry.teamRef) {
        transaction.update(entry.teamRef, { points: increment(points) });
      }
    }

    transaction.set(doc(UploadCollectionRef), upload);
  });
};

export const listRecentUploads = async ({
  userUid,
  count,
}: {
  userUid?: string;
  count?: number;
}) => {
  let uploadQuery = query(
    UploadCollectionRef,
    orderBy('date', 'desc'),
    limit(count === undefined ? 25 : count)
  );

  if (userUid) {
    uploadQuery = query(
      uploadQuery,
      where('userRef', '==', UserInfoService.getReference(userUid))
    );
  }

  const snapshot = await getDocs(uploadQuery);

  return snapshot.docs.map((document) => document.data() as Upload);
};
