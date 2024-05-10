import { TeamWithMetaData } from '../../models';
import { getTeamCollectionRef } from '../CollectionRefs';
import { getDocs, orderBy, query } from '@firebase/firestore';
import { withMetaData } from './all';

/**
 * Given an eventUid, returns a list of teams
 * @param eventUid
 */
export const getTeamsByEvent = async (
  eventUid: string
): Promise<TeamWithMetaData[]> =>
  getDocs(getTeamCollectionRef(eventUid)).then((teams) =>
    teams.docs.map((doc) => withMetaData(doc))
  );

/**
 * Given an eventUid, returns a list of teams sorted by points in descending order
 * @param eventUid
 */
export const getTeamLeaderboard = async (
  eventUid: string
): Promise<TeamWithMetaData[]> =>
  getDocs(
    query(getTeamCollectionRef(eventUid), orderBy('points', 'desc'))
  ).then((teams) => teams.docs.map((doc) => withMetaData(doc)));
