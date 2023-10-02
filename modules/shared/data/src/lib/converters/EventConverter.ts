import { FirestoreDataConverter } from 'firebase/firestore';
import type { Event, EventData } from '../models/Event';

export const EventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (event: Event) => ({
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
    registrationStart: event.registrationStart,
    registrationEnd: event.registrationEnd,
  }),
  fromFirestore: (snapshot, options): Event => {
    const data = snapshot.data(options) as EventData;

    return {
      uid: snapshot.id,
      name: data.name,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      description: data.description,
      registrationStart: data.registrationStart.toDate(),
      registrationEnd: data.registrationEnd.toDate(),
    };
  },
};
