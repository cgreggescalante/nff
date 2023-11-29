import { FirestoreDataConverter } from 'firebase/firestore';
import { Team, TeamWithUid } from '../models/Team';

export const TeamConverter: FirestoreDataConverter<Team> = {
  toFirestore: (team: Team) => Object.assign({}, team),
  fromFirestore: (snapshot, options): TeamWithUid => {
    return {
      ...(snapshot.data(options) as Team),
      uid: snapshot.id,
    };
  },
};
