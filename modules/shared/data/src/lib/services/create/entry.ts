import { Entry, EntryWithMetaData, EventWithMetadata } from '../../models';
import { addDoc, arrayUnion, updateDoc } from '@firebase/firestore';
import { getEntryCollectionRef, getUserRef } from '../CollectionRefs';

export const registerUserForEvent = async (
  event: EventWithMetadata,
  userUid: string,
  goal = 1
): Promise<EntryWithMetaData> => {
  const userRef = getUserRef(userUid);

  const entry: Entry = {
    userRef,
    eventRef: event.ref,
    duration: {},
    goal: goal,
    points: 0,
  };

  const entryRef = await addDoc(getEntryCollectionRef(userUid), entry);

  await updateDoc(event.ref, {
    entryRefs: arrayUnion(entryRef),
  });

  return { ...entry, uid: entryRef.id, ref: entryRef };
};
