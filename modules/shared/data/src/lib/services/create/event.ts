import Event, { EventWithUid } from '../../models/Event';
import { addDoc } from '@firebase/firestore';
import { EventCollectionRef } from '../CollectionRefs';

export const createEvent = async (event: Event): Promise<EventWithUid> => {
  const docRef = await addDoc(EventCollectionRef, event);
  return { ...event, uid: docRef.id };
};