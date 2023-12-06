import { Event, EventWithMetadata } from '../../models';
import { addDoc } from '@firebase/firestore';
import { EventCollectionRef } from '../CollectionRefs';

export const createEvent = async (event: Event): Promise<EventWithMetadata> => {
  const docRef = await addDoc(EventCollectionRef, event);
  return { ...event, uid: docRef.id, ref: docRef };
};
