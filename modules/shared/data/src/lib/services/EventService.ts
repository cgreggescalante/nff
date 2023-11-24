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
import { EventConverter } from '../converters/EventConverter';
import UserInfoService from './UserInfoService';
import { updateDoc } from '@firebase/firestore';
import UserInfo from '../models/UserInfo';
import EntryService from './EntryService';

import { WorkoutTypeToNumber } from '@shared-data';

class EventService extends FirestoreService<Event> {
  public constructor() {
    super(collection(db, 'events'), EventConverter);
  }

  override async delete(documentId: string): Promise<void> {
    try {
      const eventRef = this.getReference(documentId);
      const event = await super.read(documentId);

      if (!event) throw new Error(`No event with ID: ${documentId}`);

      for (const userId in event.registeredUsers) {
        const userRef = UserInfoService.getReference(userId);
        await updateDoc(userRef, {
          registeredEvents: arrayRemove(eventRef),
        });
      }

      const snapshot = await getDocs(
        query(collection(db, 'entries'), where('event', '==', eventRef))
      );

      for (const key in snapshot.docs) {
        await deleteDoc(snapshot.docs[key].ref);
      }

      return super.delete(documentId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addUser(event: Event, user: UserInfo): Promise<UserInfo> {
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
  ): Promise<{ user: UserInfo; points: WorkoutTypeToNumber }[]> {
    try {
      const ref = this.getReference(eventId);

      // TODO: Use scoring rates to sort entries
      const entries = await EntryService.getByEvent(ref);
      entries.sort((a, b) => {
        const aPoints = a.duration.Run;
        const bPoints = b.duration.Run;
        return (bPoints ? bPoints : 0) - (aPoints ? aPoints : 0);
      });

      const leaderboard = [];

      for (const entry of entries) {
        const user = await UserInfoService.read(
          entry.userRef as DocumentReference<UserInfo>
        );
        if (!user) continue;
        leaderboard.push({ user, points: entry.duration });
      }

      return leaderboard;
    } catch (error) {
      console.error('Error while retrieving leaderboard', error);
      return Promise.reject(error);
    }
  }
}

export default new EventService();
