import { getTeamRef } from '../CollectionRefs';
import {
  deleteField,
  DocumentReference,
  getDoc,
  runTransaction,
} from '@firebase/firestore';
import { db } from '../../firebase';
import { Entry } from '../../models';

export const deleteTeam = async (eventId: string, teamId: string) => {
  const teamSnapshot = await getDoc(getTeamRef(eventId, teamId));
  if (!teamSnapshot.exists()) throw new Error('Team does not exist');
  const teamRef = teamSnapshot.ref;
  const entryRefs = teamSnapshot.data()?.entryRefs;

  await runTransaction(db, async (transaction) => {
    transaction.delete(teamRef);
    entryRefs.forEach((entry: DocumentReference<Entry>) => {
      transaction.update(entry, {
        teamRef: deleteField(),
      });
    });
  });
};
