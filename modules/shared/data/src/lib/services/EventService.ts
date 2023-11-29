import { FirestoreService } from './FirestoreService';
import { db } from '../firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import type Event from '../models/Event';
import type { EventWithUid } from '../models/Event';
import type { EventWithTeams } from '../models/Event';
import { EventConverter } from '../converters/EventConverter';
import UserInfoService from './UserInfoService';
import { updateDoc } from '@firebase/firestore';
import UserInfo from '../models/UserInfo';
import EntryService from './EntryService';
import { Entry } from '../models/Entry';
import TeamService from './TeamService';
import { TeamWithUid } from '../models/Team';

class EventService extends FirestoreService<Event> {
  public constructor() {
    super(collection(db, 'events'), EventConverter);
  }

  override async delete(documentId: string): Promise<void> {
    const eventRef = this.getReference(documentId);
    const event = await super.read(documentId);

    if (!event) throw new Error(`No event with ID: ${documentId}`);

    try {
      for (const userId in event.registeredUserRefs) {
        const userRef = UserInfoService.getReference(userId);
        await updateDoc(userRef, {
          registeredEvents: arrayRemove(eventRef),
        });
      }

      const snapshot = await getDocs(
        query(collection(db, 'entries'), where('eventRef', '==', eventRef))
      );

      for (const key in snapshot.docs) {
        await deleteDoc(snapshot.docs[key].ref);
      }

      return super.delete(documentId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addUser(event: EventWithUid, user: UserInfo): Promise<UserInfo> {
    try {
      if (!event.uid)
        throw new Error('Attempting to add UserInfo to Event with no ID');

      const eventRef = this.getReference(event.uid);
      const userRef = UserInfoService.getReference(user.uid);

      await updateDoc(eventRef, {
        registeredUsers: arrayUnion(userRef),
      });

      return UserInfoService.addEvent(user, userRef, eventRef);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /*
   * Get the leaderboard for a given event.
   * Query all the entries for the event, and sort them by points.
   */
  async getLeaderboard(
    eventId: string
  ): Promise<{ user: UserInfo; entry: Entry }[]> {
    try {
      const ref = this.getReference(eventId);

      const entries = await EntryService.getByEvent(ref);

      const leaderboardEntries = [];

      for (const entry of entries) {
        const user = await UserInfoService.read(
          entry.userRef as DocumentReference<UserInfo>
        );
        if (!user) continue;
        leaderboardEntries.push({ user, entry });
      }

      leaderboardEntries.sort((a, b) => b.entry.points - a.entry.points);

      return leaderboardEntries;
    } catch (error) {
      console.error('Error while retrieving leaderboard', error);
      return Promise.reject(error);
    }
  }

  async getTeams(eventId: string): Promise<EventWithTeams> {
    const event = await this.read(eventId);

    if (!event) throw new Error(`No event with ID: ${eventId}`);

    const teamRefs = event.teamRefs;
    const teams = await Promise.all(
      teamRefs.map(async (teamRef) => {
        const team = await TeamService.read(teamRef);
        if (!team) throw new Error(`No team with ID: ${teamRef.id}`);
        return team;
      })
    );

    return {
      ...event,
      teams,
    };
  }

  async addTeam(eventId: string, teamName: string): Promise<Event> {
    const event = await this.read(eventId);

    if (!event) throw new Error(`No event with ID: ${eventId}`);

    // TODO: Create team through better interface
    const team: TeamWithUid = await TeamService.create({
      name: teamName,
      ownerRef: UserInfoService.getReference(event.registeredUserRefs[0].id),
      memberRefs: [],
      eventRef: this.getReference(eventId),
      points: 0,
    });

    await updateDoc(this.getReference(eventId), {
      teamRefs: arrayUnion(TeamService.getReference(team.uid)),
    });

    return event;
  }
}

export default new EventService();
