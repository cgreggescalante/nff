import {
  CollectionReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query, where
} from "firebase/firestore";
import { UserInfoConverter } from "../converters/UserInfoConverter";
import { UserInfo } from '../models/UserInfo';
import { db } from "../firebase";

export class UserInfoService {
  private readonly collectionRef: CollectionReference;

  constructor() {
    this.collectionRef = collection(db, "users").withConverter(UserInfoConverter);
  }

  async create(uid: string): Promise<boolean> {
    try {
      await setDoc(doc(this.collectionRef, uid), {
        name: {
          firstName: "",
          lastName: ""
        },
        uid,
        role: ""
      });

      return true;
    } catch (error) {
      console.error("Error creating user: ", error);
      return false;
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

  async delete(id: string): Promise<boolean> {
    try {
      const userRef = doc(this.collectionRef, id);

      await deleteDoc(userRef);

      await getDocs(query(
        collection(db, "uploads"),
        where("user", "==", userRef)
      ))
        .then(docs => {
          docs.forEach(doc => deleteDoc(doc.ref));
        });

      return true;
    } catch (error) {
      console.error("Error while deleting user: ", error);
      return false;
    }
  }
}