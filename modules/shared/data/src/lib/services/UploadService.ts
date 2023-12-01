import {
  collection,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import UploadConverter from '../converters/UploadConverter';
import type Upload from '../models/Upload';
import UserInfoService from './UserInfoService';
import type UserInfo from '../models/UserInfo';
import { FirestoreService } from './FirestoreService';

import { addWorkoutTypeToNumber } from '../models/WorkoutType';
import { EntryCollectionRef, UploadCollectionRef } from './CollectionRefs';
import { doc } from '@firebase/firestore';
import { EntryWithUid } from '../models/Entry';
import { ApplyScoring } from '../models/ScoringConfiguration';
import { readEvent } from './EventService';

class UploadService extends FirestoreService<Upload> {
  public constructor() {
    super(collection(db, 'uploads'), UploadConverter);
  }

  /**
   * Returns the most recent uploads.
   * @param uid
   * @param count
   */
  async getRecent({
    uid,
    count,
  }: {
    uid?: string;
    count?: number;
  }): Promise<Upload[]> {
    try {
      let uploadQuery = query(
        this.collectionReference.withConverter(this.converter),
        orderBy('date', 'desc'),
        limit(count === undefined ? 25 : count)
      );

      let user: UserInfo | null = null;

      if (uid !== undefined) {
        const userRef = UserInfoService.getReference(uid);
        user = await UserInfoService.read(uid);
        uploadQuery = query(uploadQuery, where('user', '==', userRef));
      }

      const snapshot = await getDocs(uploadQuery);

      return snapshot.docs.map((document) => {
        const upload = document.data() as Upload;
        upload.user = user != null ? user : undefined;
        return upload;
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new UploadService();

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
  // TODO: Replace method of UploadService, don't need to return userInfo
};
