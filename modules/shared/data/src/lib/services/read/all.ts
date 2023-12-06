import { GetDocumentReference } from '../CollectionRefs';
import { CollectionReference, getDoc, getDocs } from '@firebase/firestore';
import { WithUid } from '../../models/Models';

export const readDocument =
  <T>(getReference: GetDocumentReference<T>) =>
  async (documentId: string): Promise<(T & WithUid) | undefined> => {
    const document = await getDoc(getReference(documentId));
    return document.exists()
      ? { ...document.data(), uid: document.id, ref: document.ref }
      : undefined;
  };

export const listDocuments =
  <T>(collectionReference: CollectionReference<T>) =>
  async (): Promise<(T & WithUid)[]> => {
    const documents = await getDocs(collectionReference);
    return documents.docs.map((doc) => ({
      ...doc.data(),
      uid: doc.id,
      ref: doc.ref,
    }));
  };
