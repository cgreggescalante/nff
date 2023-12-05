import { Team, TeamWithUid } from '../models/Team';
import {
  arrayRemove,
  deleteField,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { doc, updateDoc } from '@firebase/firestore';
import {
  EntryCollectionRef,
  EventCollectionRef,
  getTeamCollectionRef,
  getTeamRef,
  TeamCollectionRef,
} from './CollectionRefs';
import { TeamConverter } from '../converters/TeamConverter';

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
  const teams = await getDocs(
    query(
      TeamCollectionRef,
      where('eventRef', '==', doc(EventCollectionRef, eventUid)),
      orderBy('points', 'desc')
    )
  );

  return teams.docs.map((doc) => doc.data() as Team);
};

export const deleteTeam = async (eventId: string, teamId: string) => {
  const teamRef = getTeamRef(eventId, teamId);
  const entryRefs = await getDocs(
    query(EntryCollectionRef, where('teamRef', '==', teamRef))
  );
  const eventRefs = await getDocs(
    query(EventCollectionRef, where('teamRefs', 'array-contains', teamRef))
  );

  await runTransaction(db, async (transaction) => {
    transaction.delete(teamRef);
    transaction.update(eventRefs.docs[0].ref, {
      teamRefs: arrayRemove(teamRef),
    });
    entryRefs.forEach((entry) => {
      transaction.update(entry.ref, {
        teamRef: deleteField(),
      });
    });
  });
};

export const updateTeamName = async (
  eventUid: string,
  teamUid: string,
  name: string
) => {
  const teamRef = getTeamRef(eventUid, teamUid);
  await updateDoc(teamRef, { name });
};
