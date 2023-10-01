import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { UserInfo } from '../models/UserInfo';
import { db } from '../firebase';

class UserInfoService {
  private static instance: UserInfoService;

  private static collectionRef: CollectionReference;

  constructor() {
    if (UserInfoService.instance) return UserInfoService.instance;

    UserInfoService.instance = this;

    UserInfoService.collectionRef = collection(db, 'users').withConverter(
      UserInfoConverter
    );
  }

  getReference(uid: string): DocumentReference {
    return doc(UserInfoService.collectionRef, uid);
  }

  async create(uid: string): Promise<UserInfo | undefined> {
    try {
      await setDoc(doc(UserInfoService.collectionRef, uid), {
        name: {
          firstName: '',
          lastName: '',
        },
        uid,
        role: '',
      });

      return (
        await getDoc(
          doc(
            UserInfoService.collectionRef.withConverter(UserInfoConverter),
            uid
          )
        )
      ).data();
    } catch (error) {
      console.error('Error creating user: ', error);
      return undefined;
    }
  }

  async getById(id: string): Promise<UserInfo | null> {
    try {
      const snapshot = await getDoc(doc(UserInfoService.collectionRef, id));
      return snapshot.exists() ? (snapshot.data() as UserInfo) : null;
    } catch (error) {
      console.error('Error getting user: ', error);
      return null;
    }
  }

  async setUserDetails(id: string, user: UserInfo): Promise<boolean> {
    try {
      await setDoc(doc(UserInfoService.collectionRef, id), user, {
        merge: true,
      });
      return true;
    } catch (error) {
      console.error('Error while updating user: ', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const userRef = doc(UserInfoService.collectionRef, id);

      await deleteDoc(userRef);

      await getDocs(
        query(collection(db, 'uploads'), where('user', '==', userRef))
      ).then((docs) => {
        docs.forEach((doc) => deleteDoc(doc.ref));
      });

      return true;
    } catch (error) {
      console.error('Error while deleting user: ', error);
      return false;
    }
  }

  async getUsers(): Promise<UserInfo[]> {
    try {
      const snapshot = await getDocs(query(UserInfoService.collectionRef));

      return snapshot.docs.map((document) => document.data() as UserInfo);
    } catch (error) {
      console.error('Error while fetching users: ', error);
      return [];
    }
  }
}

export default new UserInfoService();
