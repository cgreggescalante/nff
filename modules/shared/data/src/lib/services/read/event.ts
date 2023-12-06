import { EventCollectionRef, getEventRef } from '../CollectionRefs';
import { listDocuments, readDocument } from './all';

export const listEvents = listDocuments(EventCollectionRef);

export const readEvent = readDocument(getEventRef);
