import Upload from '../../models/Upload';
import { UserInfoWithUid } from '../../models/UserInfo';
import { doc, getDocs, increment, runTransaction } from '@firebase/firestore';
import { db } from '../../firebase';
import {
  getEntryCollectionRef,
  getEntryRef,
  getUploadCollectionRef,
} from '../CollectionRefs';
import { EntryWithUid } from '../../models/Entry';
import { ApplyScoring } from '../../models/ScoringConfiguration';
import { addWorkoutTypeToNumber } from '../../models/WorkoutType';
import { readEvent } from '../read/event';

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
