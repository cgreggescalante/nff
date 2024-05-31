import { Message } from '@shared-data';
import { addDoc } from '@firebase/firestore';
import { MessageCollectionRef } from '../CollectionRefs';

export const createMessage = async (message: Message) => {
  return addDoc(MessageCollectionRef, message);
};