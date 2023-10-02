import {
  CollectionReference,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from '@firebase/firestore';
import { FirestoreDataConverter, setDoc } from 'firebase/firestore';

export abstract class FirestoreService<T> {
  protected constructor(
    protected collectionReference: CollectionReference,
    protected converter: FirestoreDataConverter<T>
  ) {}

  public async createWithId(id: string, document: T): Promise<T> {
    try {
      const docRef = doc(
        this.collectionReference.withConverter(this.converter),
        id
      );
      return setDoc(docRef, document)
        .then((_) => document)
        .catch((error) => error);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async create(document: T): Promise<T> {
    try {
      const docRef = await addDoc(
        this.collectionReference.withConverter(this.converter),
        document
      );
      return { ...document, id: docRef.id };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async read(documentId: string): Promise<T | null> {
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
  }

  public async update(
    documentId: string,
    document: Partial<any & T>
  ): Promise<void> {
    try {
      const docRef = doc(this.collectionReference, documentId);
      await updateDoc(docRef, document);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete(documentId: string): Promise<void> {
    try {
      const docRef = doc(
        this.collectionReference.withConverter(this.converter),
        documentId
      );
      await deleteDoc(docRef);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async list(): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(
        this.collectionReference.withConverter(this.converter)
      );
      return querySnapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
