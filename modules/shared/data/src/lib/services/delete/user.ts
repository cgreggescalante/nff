import { auth, db } from '../../firebase';
import {
  arrayRemove,
  DocumentReference,
  getDocs,
  runTransaction,
} from '@firebase/firestore';
import {
  getEntryCollectionRef,
  getUploadCollectionRef,
  getUserRef,
} from '../CollectionRefs';
import Entry from '../../models/Entry';

export const deleteUser = async (userUid: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userRef = getUserRef(userUid);

  const uploadRefs = await getDocs(getUploadCollectionRef(userUid));

  const entries: [Entry, DocumentReference<Entry>][] = (
    await getDocs(getEntryCollectionRef(userUid))
  ).docs.map((doc) => [doc.data(), doc.ref]);

  await runTransaction(db, async (transaction) => {
    transaction.delete(userRef);
    uploadRefs.forEach((uploadRef) => transaction.delete(uploadRef.ref));
    entries.forEach(([entry, ref]) => {
      transaction.update(entry.eventRef, {
        entryRefs: arrayRemove(ref),
      });
      if (entry.teamRef)
        transaction.update(entry.teamRef, {
          entryRefs: arrayRemove(ref),
        });
      transaction.delete(ref);
    });
  });
};
