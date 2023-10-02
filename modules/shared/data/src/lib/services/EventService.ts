import { FirestoreService } from './FirestoreService';
import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import { Event } from '../models/Event';
import { EventConverter } from '../converters/EventConverter';

class EventService extends FirestoreService<Event> {
  public constructor() {
    super(collection(db, 'events'), EventConverter);
  }
}

export default new EventService();
