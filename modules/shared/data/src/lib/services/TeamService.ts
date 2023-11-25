import { FirestoreService } from './FirestoreService';
import { Team } from '../models/Team';
import {
  collection,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { TeamConverter } from '../converters/TeamConverter';

class TeamService extends FirestoreService<Team> {
  public constructor() {
    super(collection(db, 'teams'), TeamConverter);
  }

  async getByEvent(eventRef: DocumentReference): Promise<Team[]> {
    try {
      const docs = await getDocs(
        query(this.collectionReference, where('eventRef', '==', eventRef))
      );
      return docs.docs.map((doc) => this.converter.fromFirestore(doc));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new TeamService();
