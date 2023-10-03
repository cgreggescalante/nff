import { FirestoreService } from './FirestoreService';
import { db } from '../firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import type Event from '../models/Event';
import { EventConverter } from '../converters/EventConverter';
import UserInfoService from './UserInfoService';
import { updateDoc } from '@firebase/firestore';
import UserInfo from '../models/UserInfo';

class EventService extends FirestoreService<Event> {
  public constructor() {
    super(collection(db, 'events'), EventConverter);
  }

  getReference(uid: string) {
    return doc(this.collectionReference, uid);
  }

  override async delete(documentId: string): Promise<void> {
    try {
      const eventRef = this.getReference(documentId);
      const event = await super.read(documentId);

      if (!event) throw new Error(`No event with ID: ${documentId}`);

      for (const userId in event.registeredUsers) {
        const userRef = UserInfoService.getReference(userId);
        await updateDoc(userRef, {
          registeredEvents: arrayRemove(eventRef),
        });
      }

      const snapshot = await getDocs(
        query(collection(db, 'entries'), where('event', '==', eventRef))
      );

      for (const key in snapshot.docs) {
        await deleteDoc(snapshot.docs[key].ref);
      }

      return super.delete(documentId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addUser(event: Event, user: UserInfo): Promise<void> {
    try {
      if (!event.uid)
        throw new Error('Attempting to add UserInfo to Event with no ID');

      const eventRef = this.getReference(event.uid);
      const userRef = UserInfoService.getReference(user.uid);

      await updateDoc(eventRef, {
        registeredUsers: arrayUnion(userRef),
      });

      await UserInfoService.addEvent(userRef, eventRef);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new EventService();
