import { FirestoreDataConverter } from 'firebase/firestore';
import type { Event } from '../models/Event';

export const EventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (event: Event) => Object.assign({}, event),
  fromFirestore: (snapshot, options): Event => {
    const data = snapshot.data(options) as Event;

    return {
      uid: snapshot.id,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
      registrationStart: data.registrationStart,
      registrationEnd: data.registrationEnd,
      registeredUsers: data.registeredUsers,
    };
  },
};
