import { EventWithMetadata } from '../../models';
import { getDocs, runTransaction } from '@firebase/firestore';
import { db } from '../../firebase';
import { getTeamCollectionRef } from '../CollectionRefs';

export const deleteEvent = async (event: EventWithMetadata): Promise<void> => {
  return runTransaction(db, async (transaction) => {
    const teams = await getDocs(getTeamCollectionRef(event.uid));

    transaction.delete(event.ref);

    teams.forEach((team) => transaction.delete(team.ref));

    event.entryRefs.forEach((ref) => {
      transaction.delete(ref);
    });
  });
};
