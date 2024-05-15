import { Entry, EntryWithMetaData, EventWithMetadata } from '../../models';
import { addDoc, arrayUnion, updateDoc } from '@firebase/firestore';
import { getEntryCollectionRef } from '../CollectionRefs';
import { User } from '@firebase/auth';

export const registerUserForEvent = async (
  event: EventWithMetadata,
  user: User,
  goal: number,
  category: string
): Promise<EntryWithMetaData> => {
  const entry: Entry = {
    userId: user.uid,
    userDisplayName: user.displayName || '',
    eventRef: event.ref,
    activities: {},
    activityPoints: {},
    goal,
    category,
    points: 0,
  };

  const entryRef = await addDoc(getEntryCollectionRef(event.uid), entry);

  await updateDoc(event.ref, {
    entryRefs: arrayUnion(entryRef),
  });

  return { ...entry, uid: entryRef.id, ref: entryRef };
};
