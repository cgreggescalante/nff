import { FirestoreService } from './FirestoreService';
import { Team, TeamWithUid } from '../models/Team';
import {
  arrayRemove,
  arrayUnion,
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
import EntryService from './EntryService';

class TeamService extends FirestoreService<Team> {
  public constructor() {
    super(collection(db, 'teams'), TeamConverter);
  }

  override async delete(teamId: string): Promise<void> {
    try {
      const teamRef = this.getReference(teamId);
      const team = await this.read(teamId);

      if (!team) throw new Error(`No team with ID: ${teamId}`);

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
      const eventRef = EventService.getReference(eventUid);

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

  /*
   * Should be called whenever an entry is updated.
   */
  async updateScoring(teamRef: DocumentReference<Team>): Promise<void> {
    // Points should be the sum of all the points of the entries

    const entries = await EntryService.getByTeam(teamRef);

    const points = entries.reduce((acc, entry) => acc + entry.points, 0);

    await updateDoc(teamRef, { points });
  }

  async addUser(team: TeamWithUid, userRef: DocumentReference): Promise<void> {
    try {
      if (!team.uid)
        throw new Error('Attempting to add UserInfo to Event with no ID');

      const teamRef = this.getReference(team.uid);

      await updateDoc(teamRef, {
        memberRefs: arrayUnion(userRef),
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new TeamService();
