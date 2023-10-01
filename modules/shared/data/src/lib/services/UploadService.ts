import {
  addDoc,
  collection,
  CollectionReference,
  doc,
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

class UploadService {
  private static instance: UploadService;

  private static collectionRef: CollectionReference;

  constructor() {
    if (UploadService.instance) return UploadService.instance;

    UploadService.instance = this;

    UploadService.collectionRef = collection(db, 'uploads').withConverter(
      UploadConverter
    );
  }

  async getRecent({ uid, count }: { uid?: string; count?: number }) {
    try {
      let uploadQuery = query(
        UploadService.collectionRef,
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
      console.error('Error while fetching uploads: ', error);
      return [];
    }
  }

  async create(uid: string, description: string, workouts: Workout[]) {
    try {
      const userRef = doc(db, 'users', uid);

      await addDoc(collection(db, 'uploads'), {
        description,
        date: new Date(),
        user: userRef,
        workouts: workouts.map((w) => ({
          workoutType: w.workoutType.name,
          duration: w.duration,
          points: w.workoutType.pointsFunction(w.duration),
        })),
      });

      return true;
    } catch (error) {
      console.error('Error while creating upload: ', error);
      return false;
    }
  }
}

export default new UploadService();
