import { EventWithUid } from '../../models/Event';
import { getDocs } from 'firebase/firestore';
import { EventCollectionRef, getEventRef } from '../CollectionRefs';
import { getDoc } from '@firebase/firestore';

export const listEvents = async (): Promise<EventWithUid[]> => {
  const events = await getDocs(EventCollectionRef);
  return events.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
};

export const readEvent = async (uid: string): Promise<EventWithUid | null> => {
  const event = await getDoc(getEventRef(uid));
  return event.exists() ? { ...event.data(), uid } : null;
};
