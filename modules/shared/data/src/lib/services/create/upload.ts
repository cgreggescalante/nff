import {
  addWorkoutTypeToNumber,
  ApplyScoring,
  EntryWithMetaData,
  Upload,
  UserInfoWithMetaData,
} from '../../models';
import { doc, getDocs, increment, runTransaction } from '@firebase/firestore';
import { db } from '../../firebase';
import {
  getEntryCollectionRef,
  getEntryRef,
  getUploadCollectionRef,
} from '../CollectionRefs';
import { readEvent } from '../read';
import { withMetaData } from '../read/all';

export const createUpload = async (
  upload: Upload,
  user: UserInfoWithMetaData
) => {
  return runTransaction(db, async (transaction) => {
    const entryCollectionRef = getEntryCollectionRef(user.uid);
    const entries: EntryWithMetaData[] = (
      await getDocs(entryCollectionRef)
    ).docs.map((doc) => withMetaData(doc));

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
