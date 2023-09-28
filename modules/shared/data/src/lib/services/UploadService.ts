import { collection, CollectionReference, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { UploadConverter } from "../converters/UploadConverter";
import { Upload } from "../models/Upload";
import { UserInfoConverter } from "../converters/UserInfoConverter";

export class UploadService {
  private readonly collectionRef: CollectionReference;

  constructor() {
    this.collectionRef = collection(db, "uploads").withConverter(UploadConverter);
  }
  
  async getRecent(count = 25) {
    try {
      const snapshot = await getDocs(query(
        this.collectionRef,
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
}