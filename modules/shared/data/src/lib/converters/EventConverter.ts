import { FirestoreDataConverter } from 'firebase/firestore';
import { Event, EventData } from '../models/Event';

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

    return new Event(
      snapshot.id,
      data.name,
      data.startDate.toDate(),
      data.endDate.toDate(),
      data.description,
      data.registrationStart.toDate(),
      data.registrationEnd.toDate()
    );
  },
};
