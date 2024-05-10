import { getTeamRef } from '../CollectionRefs';
import { arrayUnion, updateDoc } from '@firebase/firestore';
import { EntryWithMetaData, TeamWithMetaData } from '../../models';

export const updateTeamName = async (
  eventUid: string,
  teamUid: string,
  name: string
) => {
  const teamRef = getTeamRef(eventUid, teamUid);
  await updateDoc(teamRef, { name });
};

export const addTeamMember = async (
  team: TeamWithMetaData,
  entry: EntryWithMetaData
) => {
  await updateDoc(team.ref, {
    entryRefs: arrayUnion(entry.ref),
    points: team.points + entry.points,
  });

  await updateDoc(entry.ref, {
    teamRef: team.ref,
  });
};
