import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import { withMetaData } from './services/read/all';
import {
  Entry,
  Event,
  EventData,
  EventWithMetadata,
  Team,
  Upload,
  UploadWithMetaData,
  WithMetaData,
} from './models';
import { Message, MessageData } from './models/Message';

export const dataConverter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => Object.assign({}, data),
  fromFirestore: (snapshot, options): T & WithMetaData<T> =>
    withMetaData(snapshot as QueryDocumentSnapshot<T>, options),
});

export const TeamConverter = dataConverter<Team>();
export const EntryConverter = dataConverter<Entry>();
export const MessageConverter: FirestoreDataConverter<Message> = {
  toFirestore: (message: Message) => Object.assign({}, message),
  fromFirestore: (snapshot, options): Message => {
    const data = snapshot.data(options) as MessageData;

    return {
      ...withMetaData(snapshot as QueryDocumentSnapshot<Message>, options),
      text: data.text,
      link: data.link,
      expirationDate: data.expirationDate.toDate(),
    };
  },
};

export const EventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (event: Event) => Object.assign({}, event),
  fromFirestore: (snapshot, options): EventWithMetadata => {
    const data = snapshot.data(options) as EventData;

    return {
      ...withMetaData(snapshot as QueryDocumentSnapshot<Event>, options),
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      registrationStart: data.registrationStart.toDate(),
      registrationEnd: data.registrationEnd.toDate(),
    };
  },
};

export const UploadConverter: FirestoreDataConverter<Upload> = {
  toFirestore: (upload: Upload) => Object.assign({}, upload),
  fromFirestore: (snapshot, options): UploadWithMetaData => ({
    ...withMetaData(snapshot as QueryDocumentSnapshot<Upload>, options),
    date: new Date(snapshot.data(options)['date']['seconds'] * 1000),
  }),
};
