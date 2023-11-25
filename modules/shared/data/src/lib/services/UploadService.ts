import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import UploadConverter from '../converters/UploadConverter';
import type Upload from '../models/Upload';
import UserInfoService from './UserInfoService';
import type UserInfo from '../models/UserInfo';
import { FirestoreService } from './FirestoreService';
import EntryService from './EntryService';

import { WorkoutTypeToNumber } from '../models/WorkoutType';

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

  /**
   * Creates an upload from the user, description, and workouts.
   * @param user
   * @param description
   * @param workouts
   */
  createFromComponents = async (
    user: UserInfo,
    description: string,
    workouts: WorkoutTypeToNumber
  ) => {
    try {
      const upload: Upload = {
        userRef: UserInfoService.getReference(user.uid),
        userFirstName: user.name.firstName,
        userLastName: user.name.lastName,
        description,
        date: new Date(),
        workouts,
      };

      await super.create(upload);
      await EntryService.updateEntries(user, upload);

      return upload;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * Creates an upload from the user and upload.
   * ONLY USED FOR TESTING.
   * @param user
   * @param upload
   */
  createTest = async (user: UserInfo, upload: Upload): Promise<Upload> => {
    try {
      const u: Upload = {
        userRef: UserInfoService.getReference(user.uid),
        userFirstName: user.name.firstName,
        userLastName: user.name.lastName,
        description: upload.description,
        date: upload.date,
        workouts: upload.workouts,
      };

      await super.create(u);
      await EntryService.updateEntries(user, u);

      return u;
    } catch (error) {
      console.error('Error while creating test upload', error);
      return Promise.reject(error);
    }
  };
}

export default new UploadService();
