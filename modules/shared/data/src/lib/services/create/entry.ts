import { EventWithUid } from '../../models/Event';
import { Entry, EntryWithUid } from '../../models/Entry';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  getEntryCollectionRef,
  getEventRef,
  getUserRef,
} from '../CollectionRefs';
import { arrayUnion } from 'firebase/firestore';

export const registerUserForEvent = async (
  event: EventWithUid,
  userUid: string
): Promise<EntryWithUid> => {
  const userRef = getUserRef(userUid);
  const eventRef = getEventRef(event.uid);

  await updateDoc(eventRef, {
    registeredUserRefs: arrayUnion(userRef),
  });

  const entry: Entry = {
    userRef,
    eventRef,
    duration: {},
    goals: {},
    points: 0,
  };

  const entryRef = await addDoc(getEntryCollectionRef(userUid), entry);

  await updateDoc(userRef, {
    entryRefs: arrayUnion(entryRef),
  });

  return { ...entry, uid: entryRef.id };
};
