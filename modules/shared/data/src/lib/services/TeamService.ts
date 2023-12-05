import { Team } from '../models/Team';
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
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import {
  EntryCollectionRef,
  EventCollectionRef,
  TeamCollectionRef,
} from './CollectionRefs';

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

export const deleteTeam = async (teamId: string) => {
  const teamRef = doc(TeamCollectionRef, teamId);
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

export const readTeam = async (teamUid: string) => {
  const teamRef = doc(TeamCollectionRef, teamUid);
  const team = await getDoc(teamRef);
  
  return team.data();
}

export const updateTeamName = async (teamUid: string, name: string) => {
  const teamRef = doc(TeamCollectionRef, teamUid);
  await updateDoc(teamRef, { name })
}
