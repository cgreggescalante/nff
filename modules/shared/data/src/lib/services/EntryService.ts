import { FirestoreService } from './FirestoreService';
import { Entry } from '../models/Entry';
import { EntryConverter } from '../converters/EntryConverter';
import { db } from '../firebase';
import { collection } from 'firebase/firestore';

class EntryService extends FirestoreService<Entry> {
  public constructor() {
    super(collection(db, 'entries'), EntryConverter);
  }
}

export default new EntryService();
