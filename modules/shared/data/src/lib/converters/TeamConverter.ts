import { FirestoreDataConverter } from 'firebase/firestore';
import { Team } from '../models/Team';

export const TeamConverter: FirestoreDataConverter<Team> = {
  toFirestore: (team: Team) => Object.assign({}, team),
  fromFirestore: (snapshot, options): Team => {
    return {
      ...(snapshot.data(options) as Team),
      uid: snapshot.id,
    };
  },
};
