import {
  collectionGroup,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
} from 'firebase/firestore';
import { db } from '../firebase';
import type Upload from '../models/Upload';
import type { UserInfoWithUid } from '../models/UserInfo';

import { addWorkoutTypeToNumber } from '../models/WorkoutType';
import {
  getEntryCollectionRef,
  getEntryRef,
  getUploadCollectionRef,
} from './CollectionRefs';
import { doc } from '@firebase/firestore';
import { EntryWithUid } from '../models/Entry';
import { ApplyScoring } from '../models/ScoringConfiguration';
import { readEvent } from './EventService';
import UploadConverter from '../converters/UploadConverter';

export const createUpload = async (upload: Upload, user: UserInfoWithUid) => {
  return runTransaction(db, async (transaction) => {
    const entryCollectionRef = getEntryCollectionRef(user.uid);
    const entries: EntryWithUid[] = (
      await getDocs(entryCollectionRef)
    ).docs.map((doc) => ({
      ...(doc.data() as EntryWithUid),
      uid: doc.id,
    }));

    for (const entry of entries) {
      const event = await readEvent(entry.eventRef.id);

      if (!event) continue;

      const points = ApplyScoring(event.scoringRules, upload.workouts);

      transaction.update(getEntryRef(user.uid, entry.uid), {
        duration: addWorkoutTypeToNumber(entry.duration, upload.workouts),
        points: entry.points + points,
      });

      if (entry.teamRef) {
        transaction.update(entry.teamRef, { points: increment(points) });
      }
    }

    transaction.set(doc(getUploadCollectionRef(user.uid)), upload);
  });
};

export const listRecentUploads = async ({
  userUid,
  count,
}: {
  userUid?: string;
  count?: number;
}) => {
  let uploadQuery;

  if (userUid)
    uploadQuery = query(
      getUploadCollectionRef(userUid),
      orderBy('date', 'desc'),
      limit(count === undefined ? 25 : count)
    );
  else
    uploadQuery = query(
      collectionGroup(db, 'uploads'),
      orderBy('date', 'desc'),
      limit(count === undefined ? 25 : count)
    );

  const snapshot = await getDocs(uploadQuery.withConverter(UploadConverter));

  return snapshot.docs.map((document) => document.data());
};
