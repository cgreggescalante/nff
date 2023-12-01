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
import { addDoc } from '@firebase/firestore';

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
        points: 0,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getByTeam(teamRef: DocumentReference): Promise<Entry[]> {
    const docs = await getDocs(
      query(this.collectionReference, where('teamRef', '==', teamRef))
    );
    return docs.docs.map((doc) => this.converter.fromFirestore(doc));
  }
}

export default new EntryService();
