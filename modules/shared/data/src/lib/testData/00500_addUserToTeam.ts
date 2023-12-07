import { db } from './admin-firebase';
import { FieldValue } from 'firebase-admin/firestore';

export const addUserToTeam = async (
  eventId: string,
  teamId: string,
  userId: string
) => {
  const entryCollectionRef = db
    .collection('users')
    .doc(userId)
    .collection('entries');

  const eventRef = db.collection('events').doc(eventId);

  const querySnapshot = await entryCollectionRef
    .where('eventRef', '==', eventRef)
    .get();
  const entryRef = querySnapshot.docs[0].ref;

  await db.runTransaction(async (transaction) => {
    const teamRef = db
      .collection('events')
      .doc(eventId)
      .collection('teams')
      .doc(teamId);

    transaction.update(entryRef, { teamRef });
    transaction.update(teamRef, { entryRefs: FieldValue.arrayUnion(entryRef) });
  });
};
