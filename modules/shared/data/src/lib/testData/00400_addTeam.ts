import { db } from './firebase';

// User must be registered for event before adding team
export const addTeam = async (
  user: { uid: string; firstName: string },
  event: { uid: string }
) => {
  const entryCollectionRef = db
    .collection('users')
    .doc(user.uid)
    .collection('entries');

  const eventRef = db.collection('events').doc(event.uid);

  const querySnapshot = await entryCollectionRef
    .where('eventRef', '==', eventRef)
    .get();
  const entryRef = querySnapshot.docs[0].ref;

  await db.runTransaction(async (transaction) => {
    const teamCollectionRef = eventRef.collection('teams');
    const teamRef = teamCollectionRef.doc();

    const team = {
      name: `${user.firstName}'s Team`,
      points: 0,
      ownerRef: db.collection('users').doc(user.uid),
      entryRefs: [entryRef],
      eventRef,
    };

    transaction.create(teamRef, team);
    transaction.update(entryRef, { teamRef });
  });
};
