import { TeamWithMetaData } from '../../models/Team';
import { getTeamCollectionRef } from '../CollectionRefs';
import { getDocs, orderBy, query } from '@firebase/firestore';
import { withMetaData } from './all';

export const getTeamsByEvent = async (
  eventUid: string
): Promise<TeamWithMetaData[]> =>
  getDocs(getTeamCollectionRef(eventUid)).then((teams) =>
    teams.docs.map((doc) => withMetaData(doc))
  );

export const getTeamLeaderboard = async (
  eventUid: string
): Promise<TeamWithMetaData[]> =>
  getDocs(
    query(getTeamCollectionRef(eventUid), orderBy('points', 'desc'))
  ).then((teams) => teams.docs.map((doc) => withMetaData(doc)));
