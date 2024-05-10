import {
  EntryWithMetaData,
  EventWithMetadata,
  Team,
  TeamWithMetaData,
} from '../../models';
import { addDoc, arrayUnion, updateDoc } from '@firebase/firestore';
import { getTeamCollectionRef } from '../CollectionRefs';

export const createTeamByOwner = async (
  event: EventWithMetadata,
  entry: EntryWithMetaData
): Promise<TeamWithMetaData> => {
  const team: Team = {
    name: `${entry.userDisplayName}'s Team`,
    ownerEntryRef: entry.ref,
    entryRefs: [entry.ref],
    eventRef: event.ref,
    points: entry.points,
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
