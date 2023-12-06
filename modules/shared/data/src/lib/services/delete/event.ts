import { EventWithUid } from '../../models/Event';
import { getDocs, runTransaction } from '@firebase/firestore';
import { db } from '../../firebase';
import { getEventRef, getTeamCollectionRef } from '../CollectionRefs';

export const deleteEvent = async (event: EventWithUid): Promise<void> => {
  return runTransaction(db, async (transaction) => {
    const eventRef = getEventRef(event.uid);
    const teams = await getDocs(getTeamCollectionRef(event.uid));

    transaction.delete(eventRef);

    teams.forEach((team) => transaction.delete(team.ref));

    event.entryRefs.forEach((ref) => {
      transaction.delete(ref);
    });
  });
};
