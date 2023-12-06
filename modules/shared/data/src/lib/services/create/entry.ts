import { Entry, EntryWithMetaData, EventWithMetadata } from '../../models';
import { addDoc, arrayUnion, updateDoc } from '@firebase/firestore';
import { getEntryCollectionRef, getUserRef } from '../CollectionRefs';

export const registerUserForEvent = async (
  event: EventWithMetadata,
  userUid: string
): Promise<EntryWithMetaData> => {
  const userRef = getUserRef(userUid);

  await updateDoc(event.ref, {
    registeredUserRefs: arrayUnion(userRef),
  });

  const entry: Entry = {
    userRef,
    eventRef: event.ref,
    duration: {},
    goals: {},
    points: 0,
  };

  const entryRef = await addDoc(getEntryCollectionRef(userUid), entry);

  await updateDoc(userRef, {
    entryRefs: arrayUnion(entryRef),
  });

  return { ...entry, uid: entryRef.id, ref: entryRef };
};
