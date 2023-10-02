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

  getReference(uid: string): DocumentReference {
    return doc(this.collectionReference, uid);
  }

  async createFromId(id: string): Promise<UserInfo> {
    try {
      const userInfo = new UserInfo('', '', id, '', 0);

      return this.createWithId(id, userInfo);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  override delete = async (id: string): Promise<void> => {
    try {
      const userRef = this.getReference(id);

      await getDocs(
        query(collection(db, 'uploads'), where('user', '==', userRef))
      ).then((docs) => {
        docs.forEach((doc) => deleteDoc(doc.ref));
      });

      return this.delete(id);
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

  override async update(
    documentId: string,
    document: Partial<UserInfo>
  ): Promise<void> {
    return super.update(documentId, {
      uid: document.uid,
      role: document.role,
      totalPoints: document.totalPoints,
      name: {
        firstName: document.firstName,
        lastName: document.lastName,
      },
    });
  }
}

export default new UserInfoService();
