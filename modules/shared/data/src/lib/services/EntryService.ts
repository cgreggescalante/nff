import { FirestoreService } from './FirestoreService';
import type Entry from '../models/Entry';
import { EntryConverter } from '../converters/EntryConverter';
import { db } from '../firebase';
import {
  collection,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { addDoc, getDoc } from '@firebase/firestore';
import Upload from '../models/Upload';
import UserInfo from '../models/UserInfo';

class EntryService extends FirestoreService<Entry> {
  public constructor() {
    super(collection(db, 'entries'), EntryConverter);
  }

  /**
   * Creates an empty entry for a user and event.
   * @param userRef
   * @param eventRef
   */
  async createEmpty(
    userRef: DocumentReference,
    eventRef: DocumentReference
  ): Promise<DocumentReference> {
    try {
      return await addDoc(this.collectionReference, {
        userRef,
        eventRef,
        duration: {},
        goals: {},
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getByEvent(eventRef: DocumentReference): Promise<Entry[]> {
    try {
      const docs = await getDocs(
        query(this.collectionReference, where('eventRef', '==', eventRef))
      );
      return docs.docs.map((doc) => this.converter.fromFirestore(doc));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateEntries(user: UserInfo, upload: Upload): Promise<void> {
    try {
      for (const ref of user.entries) {
        const entry = (await getDoc(ref.withConverter(this.converter))).data();
        if (entry == undefined) continue;

        upload.workouts.map((workout) => {
          const currentDuration = entry.duration.get(workout.type);
          if (currentDuration == undefined) {
            entry.duration.set(workout.type, workout.duration);
          } else {
            entry.duration.set(
              workout.type,
              currentDuration + workout.duration
            );
          }
        });

        await this.set(entry.uid, this.converter.toFirestore(entry));
      }
    } catch (error) {
      console.error('Error during EntryService.updateEntries', error);
      return Promise.reject(error);
    }
  }
}

export default new EntryService();
