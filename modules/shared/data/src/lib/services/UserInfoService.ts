import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { UserInfoConverter } from '../converters/UserInfoConverter';
import { UserInfo } from '../models/UserInfo';
import { db } from '../firebase';
import { FirestoreService } from './FirestoreService';

class UserInfoService extends FirestoreService<UserInfo> {
  public constructor() {
    super(collection(db, 'users'), UserInfoConverter);
  }

  getReference = (uid: string): DocumentReference =>
    doc(super.collectionReference, uid);

  override delete = async (id: string): Promise<void> => {
    try {
      const userRef = this.getReference(id);

      await getDocs(
        query(collection(db, 'uploads'), where('user', '==', userRef))
      ).then((docs) => {
        docs.forEach((doc) => deleteDoc(doc.ref));
      });

      return super.delete(id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getUsersByTotalPoints = async (count = 25): Promise<UserInfo[]> => {
    try {
      const snapshot = await getDocs(
        query(
          this.collectionReference,
          orderBy('points.total', 'desc'),
          limit(count)
        )
      );

      return snapshot.docs.map((document) => document.data() as UserInfo);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new UserInfoService();
