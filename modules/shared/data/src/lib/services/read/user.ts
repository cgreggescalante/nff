import { getUserRef, UserCollectionRef } from '../CollectionRefs';
import { listDocuments, readDocument } from './all';

export const readUser = readDocument(getUserRef);

export const listUsers = listDocuments(UserCollectionRef);
