import { db } from './firebase';
import { FieldValue } from 'firebase-admin/firestore';

export const registerUserForEvent = async (
  user: { uid: string },
  event: { uid: string }
) => {
  await db.runTransaction(async (transaction) => {
    const userRef = db.collection('users').doc(user.uid);
    const eventRef = db.collection('events').doc(event.uid);

    const entryCollectionRef = userRef.collection('entries');
    const entryRef = entryCollectionRef.doc();

    const entry = {
      userRef,
      eventRef,
      duration: {},
      goals: {},
      points: 0,
    };

    transaction.create(entryRef, entry);
    transaction.update(eventRef, {
      entryRefs: FieldValue.arrayUnion(entryRef),
    });
  });
};
