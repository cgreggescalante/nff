import { CollectionReference, addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
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
      const snapshot = await getDoc(doc(this.collectionRef, id));
      return snapshot.exists() ? snapshot.data() as UserInfo : null;
    } catch (error) {
      console.error("Error getting user: ", error);
      return null;
    }
  }

  async setUserDetails(id: string, user: UserInfo): Promise<boolean> {
    try {
      await setDoc(doc(this.collectionRef, id), user, { merge: true })
      return true;
    } catch (error) {
      console.error("Error while updating user: ", error);
      return false;
    }
  }
}