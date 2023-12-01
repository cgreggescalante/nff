import { FirestoreService } from './FirestoreService';
import { Team } from '../models/Team';
import {
  arrayRemove,
  collection,
  deleteField,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { TeamConverter } from '../converters/TeamConverter';
import { doc, updateDoc } from '@firebase/firestore';
import { EventCollectionRef } from './CollectionRefs';

class TeamService extends FirestoreService<Team> {
  public constructor() {
    super(collection(db, 'teams'), TeamConverter);
  }

  override async delete(teamId: string): Promise<void> {
    const teamRef = this.getReference(teamId);
    const team = await this.read(teamId);

    if (!team) throw new Error(`No team with ID: ${teamId}`);

    try {
      await updateDoc(team.eventRef, {
        teamRefs: arrayRemove(teamRef),
      });

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

  async getByEvent(eventUid: string): Promise<Team[]> {
    try {
      const eventRef = doc(EventCollectionRef, eventUid);

      const docs = await getDocs(
        query(this.collectionReference, where('eventRef', '==', eventRef))
      );
      return docs.docs.map((doc) => this.converter.fromFirestore(doc));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getLeaderboard(eventUid: string): Promise<Team[]> {
    const teams = await this.getByEvent(eventUid);

    teams.sort((a, b) => b.points - a.points);

    return teams;
  }
}

export default new TeamService();
