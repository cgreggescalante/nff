import { FirestoreDataConverter } from 'firebase/firestore';
import type { Event, EventData } from '../models/Event';

export const EventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (event: Event) => Object.assign({}, event),
  fromFirestore: (snapshot, options): Event => {
    const data = snapshot.data(options) as EventData;

    return {
      uid: snapshot.id,
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
      registeredUsers: data.registeredUsers ? data.registeredUsers : [],
    };
  },
};
