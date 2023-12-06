import { EventWithUid } from '../../models/Event';
import UserInfo from '../../models/UserInfo';
import { WithUid } from '../../models/Models';
import { Team, TeamWithUid } from '../../models/Team';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  getEntryRef,
  getEventRef,
  getTeamCollectionRef,
  getUserRef,
} from '../CollectionRefs';
import { arrayUnion } from 'firebase/firestore';

import { getEntry } from '../read/entry';

export const createTeamByOwner = async (
  event: EventWithUid,
  owner: UserInfo & WithUid
): Promise<TeamWithUid> => {
  const ownerRef = getUserRef(owner.uid);

  const entry = await getEntry(event.uid, owner.uid);
  if (!entry) throw new Error('User is not registered for this event');
  const entryRef = getEntryRef(owner.uid, entry.uid);

  const eventRef = getEventRef(event.uid);

  const team: Team = {
    name: `${owner.firstName} ${owner.lastName}'s Team`,
    ownerRef,
    entryRefs: [getEntryRef(owner.uid, entry.uid)],
    eventRef,
    points: 0,
  };

  const teamRef = await addDoc(getTeamCollectionRef(event.uid), team);

  await updateDoc(eventRef, {
    teamRefs: arrayUnion(teamRef),
  });

  await updateDoc(entryRef, {
    teamRef,
  });

  return { ...team, uid: teamRef.id };
};
