import { DocumentReference, FirestoreDataConverter } from '@firebase/firestore';
import type { Event, EventData, EventWithMetadata } from '../models/Event';

export const EventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (event: Event) => Object.assign({}, event),
  fromFirestore: (snapshot, options): EventWithMetadata => {
    const data = snapshot.data(options) as EventData;

    return {
      uid: snapshot.id,
      ref: snapshot.ref as DocumentReference<Event>,
      name: data.name,
      startDate: data.startDate ? data.startDate.toDate() : new Date(0),
      endDate: data.endDate ? data.endDate.toDate() : new Date(0),
      description: data.description,
      registrationStart: data.registrationStart
        ? data.registrationStart.toDate()
        : new Date(0),
      registrationEnd: data.registrationEnd
        ? data.registrationEnd.toDate()
        : new Date(0),
      entryRefs: data.entryRefs ? data.entryRefs : [],
      scoringRules: data.scoringRules,
    };
  },
};
