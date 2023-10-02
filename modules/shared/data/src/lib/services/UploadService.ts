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
import { UploadConverter } from '../converters/UploadConverter';
import { Upload } from '../models/Upload';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { Workout } from '../models/Workout';
import UserInfoService from './UserInfoService';
import { UserInfo } from '../models/UserInfo';
import { FirestoreService } from './FirestoreService';

class UploadService extends FirestoreService<Upload> {
  public constructor() {
    super(collection(db, 'uploads'), UploadConverter);
  }

  async getRecent({
    uid,
    count,
  }: {
    uid?: string;
    count?: number;
  }): Promise<Upload[]> {
    try {
      let uploadQuery = query(
        super.collectionReference.withConverter(super.converter),
        orderBy('date', 'desc'),
        limit(count === undefined ? 25 : count)
      );

      let user: UserInfo | null = null;

      if (uid != undefined) {
        const userRef = UserInfoService.getReference(uid);
        user = await UserInfoService.getById(uid);
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
          upload.user = (
            await getDoc(upload.userRef.withConverter(UserInfoConverter))
          ).data();
        }
      }

      return uploads;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  createFromComponents = async (
    uid: string,
    description: string,
    workouts: Workout[]
  ) => {
    try {
      const userRef = UserInfoService.getReference(uid);

      workouts = workouts.map((workout) => {
        workout.points = workout.workoutType.pointsFunction(workout.duration);
        return workout;
      });

      const upload = new Upload(userRef, description, new Date(), workouts);

      return super.create(upload);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new UploadService();
