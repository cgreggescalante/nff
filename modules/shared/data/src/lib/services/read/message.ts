import { listDocuments } from './all';
import { MessageCollectionRef } from '../CollectionRefs';

export const listMessages = listDocuments(MessageCollectionRef);
