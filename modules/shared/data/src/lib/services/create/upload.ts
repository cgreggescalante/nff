import {
  addWorkoutTypeToNumber,
  ApplyScoring,
  EntryWithMetaData,
  Upload,
  WorkoutTypeToNumber,
} from '../../models';
import {
  addDoc,
  doc,
  getDocs,
  increment,
  query,
  runTransaction,
  updateDoc,
  where,
} from '@firebase/firestore';
import { db } from '../../firebase';
import { EntryCollectionRef, UploadCollectionRef } from '../CollectionRefs';
import { readEvent } from '../read';
import { withMetaData } from '../read/all';
import { User } from '@firebase/auth';

export const createUpload = async (upload: Upload, user: User) => {
  return runTransaction(db, async (transaction) => {
    const entries: EntryWithMetaData[] = (
      await getDocs(query(EntryCollectionRef, where('userId', '==', user.uid)))
    ).docs.map((doc) => withMetaData(doc));

    for (const entry of entries) {
      const event = await readEvent(entry.eventRef.id);

      if (!event) continue;

      const points = ApplyScoring(event.scoringRules, upload.workouts);

      transaction.update(entry.ref, {
        duration: addWorkoutTypeToNumber(entry.duration, upload.workouts),
        points: entry.points + points,
      });

      if (entry.teamRef) {
        transaction.update(entry.teamRef, {
          points: increment(points),
        });
      }
    }

    transaction.set(doc(UploadCollectionRef), upload);
  });
};

export const simpleCreateUpload = async (upload: Upload) => {
  await addDoc(UploadCollectionRef, upload);
};

export const updatePoints = async (
  userId: string,
  duration: WorkoutTypeToNumber
) => {
  const entries = (
    await getDocs(query(EntryCollectionRef, where('userId', '==', userId)))
  ).docs.map((doc) => withMetaData(doc));

  for (const entry of entries) {
    const event = await readEvent(entry.eventRef.id);

    if (!event) continue;

    const points = ApplyScoring(event.scoringRules, duration);

    await updateDoc(entry.ref, {
      duration,
      points: entry.points + points,
    });

    if (entry.teamRef) {
      await updateDoc(entry.teamRef, {
        points: increment(points),
      });
    }
  }
};
