import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import { Team, TeamWithMetaData } from '../models/Team';
import { withMetaData } from '../services/read/all';

export const TeamConverter: FirestoreDataConverter<Team> = {
  toFirestore: (team: Team) => Object.assign({}, team),
  fromFirestore: (snapshot, options): TeamWithMetaData =>
    withMetaData(snapshot as QueryDocumentSnapshot<Team>, options),
};
