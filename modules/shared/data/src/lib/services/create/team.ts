import {
  EventWithMetadata,
  Team,
  TeamWithMetaData,
  UserInfoWithMetaData,
} from '../../models';
import { addDoc, arrayUnion, updateDoc } from '@firebase/firestore';
import { getEntryRef, getTeamCollectionRef } from '../CollectionRefs';

import { readEntry } from '../read';

export const createTeamByOwner = async (
  event: EventWithMetadata,
  owner: UserInfoWithMetaData
): Promise<TeamWithMetaData> => {
  const entry = await readEntry(event.uid, owner.uid);
  if (!entry) throw new Error('User is not registered for this event');

  const team: Team = {
    name: `${owner.firstName} ${owner.lastName}'s Team`,
    ownerRef: owner.ref,
    entryRefs: [getEntryRef(owner.uid, entry.uid)],
    eventRef: event.ref,
    points: 0,
  };

  const teamRef = await addDoc(getTeamCollectionRef(event.uid), team);

  await updateDoc(event.ref, {
    teamRefs: arrayUnion(teamRef),
  });

  await updateDoc(entry.ref, {
    teamRef,
  });

  return { ...team, uid: teamRef.id, ref: teamRef };
};
