import { Team, TeamWithUid } from '../../models/Team';
import { getTeamCollectionRef } from '../CollectionRefs';
import { getDocs, orderBy, query } from '@firebase/firestore';
import { TeamConverter } from '../../converters/TeamConverter';

export const getTeamsByEvent = async (
  eventUid: string
): Promise<TeamWithUid[]> => {
  const collectionRef = getTeamCollectionRef(eventUid);
  const teams = await getDocs(collectionRef);
  return teams.docs.map(
    (doc) => TeamConverter.fromFirestore(doc) as TeamWithUid
  );
};

export const getTeamLeaderboard = async (eventUid: string) => {
  const collectionRef = getTeamCollectionRef(eventUid);
  const teams = await getDocs(query(collectionRef, orderBy('points', 'desc')));

  return teams.docs.map((doc) => doc.data() as Team);
};
