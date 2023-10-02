import {
  CollectionReference,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from '@firebase/firestore';
import { FirestoreDataConverter } from 'firebase/firestore';

export abstract class FirestoreService<T> {
  protected constructor(
    private collectionReference: CollectionReference,
    private converter: FirestoreDataConverter<T>
  ) {}

  public create = async (document: T): Promise<T> => {
    try {
      const docRef = await addDoc(
        this.collectionReference.withConverter(this.converter),
        document
      );
      return { ...document, id: docRef.id };
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public read = async (documentId: string): Promise<T | null> => {
    try {
      const docRef = doc(
        this.collectionReference.withConverter(this.converter),
        documentId
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as T;
      } else {
        return null;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public update = async (
    documentId: string,
    document: Partial<T>
  ): Promise<void> => {
    try {
      const docRef = doc(
        this.collectionReference.withConverter(this.converter),
        documentId
      );
      await updateDoc(docRef, document);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public delete = async (documentId: string): Promise<void> => {
    try {
      const docRef = doc(
        this.collectionReference.withConverter(this.converter),
        documentId
      );
      await deleteDoc(docRef);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public list = async (): Promise<T[]> => {
    try {
      const querySnapshot = await getDocs(
        this.collectionReference.withConverter(this.converter)
      );
      return querySnapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
