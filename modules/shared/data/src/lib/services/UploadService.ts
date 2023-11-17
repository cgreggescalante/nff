import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import UploadConverter from '../converters/UploadConverter';
import type Upload from '../models/Upload';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import type Workout from '../models/Workout';
import UserInfoService from './UserInfoService';
import type UserInfo from '../models/UserInfo';
import { FirestoreService } from './FirestoreService';

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

      const uploads = snapshot.docs.map((document) => {
        const upload = document.data() as Upload;
        if (user != null) upload.user = user;
        return upload;
      });

      if (user == null) {
        for (const upload of uploads) {
          if (upload.userRef != undefined) {
            upload.user = (
              await getDoc(upload.userRef.withConverter(UserInfoConverter))
            ).data();
          }
        }
      }

      return uploads;
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
    workouts: Workout[]
  ) => {
    try {
      workouts = workouts.map((workout) => {
        workout.points = workout.workoutType.pointsFunction(workout.duration);
        return workout;
      });

      const upload = {
        userRef: UserInfoService.getReference(user.uid),
        description,
        date: new Date(),
        workouts,
      };

      return super.create(upload);
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
      const u = {
        userRef: UserInfoService.getReference(user.uid),
        description: upload.description,
        date: upload.date,
        workouts: upload.workouts,
      };

      return super.create(u);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new UploadService();
