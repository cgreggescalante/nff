import { ApplyScoring, Upload, WorkoutTypeToNumber } from '../../models';
import {
  addDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
import {
  EntryCollectionGroupRef,
  UploadCollectionRef,
} from '../CollectionRefs';
import { readEvent } from '../read';
import { withMetaData } from '../read/all';

export const createUpload = async (upload: Upload) => {
  return addDoc(UploadCollectionRef, upload);
};

export const updatePoints = async (
  userId: string,
  duration: WorkoutTypeToNumber
) => {
  const entries = (
    await getDocs(query(EntryCollectionGroupRef, where('userId', '==', userId)))
  ).docs.map((doc) => withMetaData(doc));

  for (const entry of entries) {
    const event = await readEvent(entry.eventRef.id);

    if (!event) continue;

    const points = ApplyScoring(duration);

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
