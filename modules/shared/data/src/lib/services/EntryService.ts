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
import Upload from '../models/Upload';
import UserInfo from '../models/UserInfo';

import { addWorkoutTypeToNumber } from '../models/WorkoutType';
import EventService from '../services/EventService';
import { ApplyScoring } from '../models/ScoringConfiguration';
import TeamService from './TeamService';

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

  async getByEvent(eventRef: DocumentReference): Promise<Entry[]> {
    try {
      const docs = await getDocs(
        query(this.collectionReference, where('eventRef', '==', eventRef))
      );
      return docs.docs.map((doc) => this.converter.fromFirestore(doc));
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

  async updateEntries(user: UserInfo, upload: Upload): Promise<void> {
    try {
      for (const ref of user.entryRefs) {
        const entry = await this.read(ref.withConverter(this.converter));

        if (entry == undefined) continue;

        const event = await EventService.read(entry.eventRef);

        if (event == null) continue;

        entry.duration = addWorkoutTypeToNumber(
          entry.duration,
          upload.workouts
        );

        entry.points += ApplyScoring(
          event.scoringConfiguration,
          upload.workouts
        );

        await this.set(entry.uid, this.converter.toFirestore(entry));
        if (entry.teamRef) await TeamService.updateScoring(entry.teamRef);
      }
    } catch (error) {
      console.error('Error during EntryService.updateEntries', error);
      return Promise.reject(error);
    }
  }
}

export default new EntryService();
