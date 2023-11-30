import {
  arrayUnion,
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
import type UserInfo from '../models/UserInfo';
import { auth, db } from '../firebase';
import { FirestoreService } from './FirestoreService';
import EntryService from './EntryService';
import { updateDoc } from '@firebase/firestore';

class UserInfoService extends FirestoreService<UserInfo> {
  public constructor() {
    super(collection(db, 'users'), UserInfoConverter);
  }

  async createFromId(
    id: string,
    firstName = '',
    lastName = ''
  ): Promise<UserInfo> {
    try {
      return this.createWithId(id, {
        name: { firstName, lastName },
        uid: id,
        entryRefs: [],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  override delete = async (id: string): Promise<void> => {
    console.log(`Attempting to delete user ${id}`);

    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user found');

    try {
      const userRef = doc(this.collectionReference, id);

      const snapshot = await getDocs(
        query(collection(db, 'uploads'), where('userRef', '==', userRef))
      );

      for (const key in snapshot.docs) {
        await deleteDoc(snapshot.docs[key].ref);
      }

      return super.delete(id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * Returns the top users by total points.
   * @param count
   */
  getUsersByTotalPoints = async (count = 25): Promise<UserInfo[]> => {
    try {
      const snapshot = await getDocs(
        query(
          this.collectionReference,
          orderBy('totalPoints', 'desc'),
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
      name: document.name,
    });
  }

  /**
   * Adds an event to a user's registered events.
   * @param user
   * @param userRef
   * @param eventRef
   */
  async addEvent(
    user: UserInfo,
    userRef: DocumentReference,
    eventRef: DocumentReference
  ): Promise<UserInfo> {
    try {
      const entryRef = await EntryService.createEmpty(userRef, eventRef);

      return updateDoc(userRef, {
        entryRefs: arrayUnion(entryRef),
      }).then(() => {
        user.entryRefs.push(entryRef);
        return user;
      });
    } catch (error) {
      console.error('Error during UserInfoService.addEvent', error);
      return Promise.reject(error);
    }
  }
}

export default new UserInfoService();
