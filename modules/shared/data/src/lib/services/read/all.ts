import { GetDocumentReference } from '../CollectionRefs';
import {
  CollectionReference,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore';
import { WithMetaData } from '../../models';

export const withMetaData = <T>(
  snapshot: QueryDocumentSnapshot<T>,
  options?: SnapshotOptions
): T & WithMetaData<T> => ({
  ...snapshot.data(options),
  uid: snapshot.id,
  ref: snapshot.ref,
});

export const readDocument =
  <T>(getReference: GetDocumentReference<T>) =>
  async (documentId: string): Promise<(T & WithMetaData<T>) | undefined> => {
    if (!documentId) return undefined;
    const document = await getDoc(getReference(documentId));
    return document.exists() ? withMetaData(document) : undefined;
  };

export const listDocuments =
  <T>(collectionReference: CollectionReference<T>) =>
  async (): Promise<(T & WithMetaData<T>)[]> => {
    const documents = await getDocs(collectionReference);
    return documents.docs.map((doc) => withMetaData(doc));
  };
