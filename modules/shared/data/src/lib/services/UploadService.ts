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
} from 'firebase/firestore';
import { db } from '../firebase';
import { UploadConverter } from '../converters/UploadConverter';
import { Upload } from '../models/Upload';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { Workout } from '../models/Workout';

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

  async getRecent(count = 25) {
    try {
      const snapshot = await getDocs(
        query(
          UploadService.collectionRef,
          orderBy('date', 'desc'),
          limit(count)
        )
      );

      const uploads = snapshot.docs.map(
        (document) => document.data() as Upload
      );

      for (const upload of uploads) {
        upload.user = (
          await getDoc(upload.userRef.withConverter(UserInfoConverter))
        ).data();
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
