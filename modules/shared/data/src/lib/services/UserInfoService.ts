import { CollectionReference, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { UserInfoConverter } from "../converters/UserInfoConverter";
import { UserInfo } from '../models/UserInfo';
import { db } from "../firebase";

export class UserInfoService {
  private readonly collectionRef: CollectionReference;

  constructor() {
    this.collectionRef = collection(db, "users").withConverter(UserInfoConverter);
  }

  async create(user: UserInfo): Promise<UserInfo | null> {
    try {
      const docRef = await addDoc(this.collectionRef, user);
      const snapshot = await getDoc(docRef.withConverter(UserInfoConverter));
      return snapshot.exists() ? snapshot.data() : null;
    } catch (error) {
      console.error("Error creating user: ", error);
      return null;
    }
  }

  async getById(id: string): Promise<UserInfo | null> {
    try {
      const snapshot = await getDoc(doc(db, "users", id).withConverter(UserInfoConverter));
      return snapshot.exists() ? snapshot.data() : null;
    } catch (error) {
      console.error("Error getting userL ", error);
      return null;
    }
  }
}