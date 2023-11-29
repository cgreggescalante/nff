import { FirestoreService } from './FirestoreService';
import { Team } from '../models/Team';
import {
  collection,
  deleteField,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { TeamConverter } from '../converters/TeamConverter';
import { updateDoc } from '@firebase/firestore';
import EventService from './EventService';

class TeamService extends FirestoreService<Team> {
  public constructor() {
    super(collection(db, 'teams'), TeamConverter);
  }

  override async delete(teamId: string): Promise<void> {
    try {
      const teamRef = this.getReference(teamId);
      const team = await this.read(teamId);

      if (!team) throw new Error(`No team with ID: ${teamId}`);

      await EventService.deleteTeamRef(team.eventRef, teamRef);

      const snapshot = await getDocs(
        query(collection(db, 'entries'), where('teamRef', '==', teamRef))
      );

      for (const doc of snapshot.docs) {
        await updateDoc(doc.ref, { teamRef: deleteField() });
      }

      return super.delete(teamId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getByEvent(eventRef: DocumentReference<Event>): Promise<Team[]> {
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
