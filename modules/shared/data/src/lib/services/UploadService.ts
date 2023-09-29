import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query
} from "firebase/firestore";
import { db } from "../firebase";
import { UploadConverter } from "../converters/UploadConverter";
import { Upload } from "../models/Upload";
import { UserInfoConverter } from "../converters/UserInfoConverter";
import { Workout } from "../models/Workout";

class UploadServiceClass {
  private static instance: UploadServiceClass;

  private static collectionRef: CollectionReference;

  constructor() {
    if (UploadServiceClass.instance) {
      return UploadServiceClass.instance;
    }

    UploadServiceClass.instance = this;

    UploadServiceClass.collectionRef = collection(db, "uploads").withConverter(UploadConverter);
  }
  
  async getRecent(count = 25) {
    try {
      const snapshot = await getDocs(query(
        UploadServiceClass.collectionRef,
        orderBy("date", "desc"),
        limit(count)
      ))

      const uploads = snapshot.docs.map(document => document.data() as Upload);

      for (const upload of uploads) {
        upload.user = (await getDoc(upload.userRef.withConverter(UserInfoConverter))).data()
      }

      return uploads;
    } catch (error) {
      console.error("Error while fetching uploads: ", error);
      return []
    }
  }

  async create(uid: string, description: string, workouts: Workout[]) {
    try {
      const userRef = doc(db, 'users', uid);

      await addDoc(collection(db, 'uploads'), {
        description,
        date: new Date(),
        user: userRef,
        workouts: workouts.map(w => ({
          workoutType: w.workoutType.name,
          duration: w.duration,
          points: w.workoutType.pointsFunction(w.duration)
        }))
      });

      return true;
    } catch (error) {
      console.error("Error while creating upload: ", error);
      return false;
    }

  }
}

const UploadService = new UploadServiceClass();

export default UploadService;