import { FirestoreService } from './FirestoreService';
import type Entry from '../models/Entry';
import { EntryConverter } from '../converters/EntryConverter';
import { db } from '../firebase';
import { collection, DocumentReference } from 'firebase/firestore';
import { addDoc } from '@firebase/firestore';

class EntryService extends FirestoreService<Entry> {
  public constructor() {
    super(collection(db, 'entries'), EntryConverter);
  }

  async createEmpty(
    userRef: DocumentReference,
    eventRef: DocumentReference
  ): Promise<DocumentReference> {
    try {
      return await addDoc(this.collectionReference, {
        userRef,
        eventRef,
        points: {},
        goals: {},
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new EntryService();
