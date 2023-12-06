import { getTeamRef } from '../CollectionRefs';
import { updateDoc } from '@firebase/firestore';

export const updateTeamName = async (
  eventUid: string,
  teamUid: string,
  name: string
) => {
  const teamRef = getTeamRef(eventUid, teamUid);
  await updateDoc(teamRef, { name });
};