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
  UserInfo,
  WithMetaData,
} from './models';

export const dataConverter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => Object.assign({}, data),
  fromFirestore: (snapshot, options): T & WithMetaData<T> =>
    withMetaData(snapshot as QueryDocumentSnapshot<T>, options),
});

export const TeamConverter = dataConverter<Team>();
export const EntryConverter = dataConverter<Entry>();
export const UserInfoConverter = dataConverter<UserInfo>();

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
