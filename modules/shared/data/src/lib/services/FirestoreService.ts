import {
  CollectionReference,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from '@firebase/firestore';
import {
  DocumentReference,
  FirestoreDataConverter,
  setDoc,
} from 'firebase/firestore';

// TODO: Separate functions by Service, no Services touching other collections
export abstract class FirestoreService<T> {
  protected constructor(
    protected collectionReference: CollectionReference,
    protected converter: FirestoreDataConverter<T>
  ) {}

  /**
   * Returns the reference to a document by ID.
   */
  public getReference(documentId: string): DocumentReference<T> {
    return doc(
      this.collectionReference.withConverter(this.converter),
      documentId
    );
  }

  /**
   * Creates a document with a custom ID
   * Returns the document created.
   * @param id
   * @param document
   */
  public async createWithId(id: string, document: T): Promise<T> {
    try {
      const docRef = doc(
        this.collectionReference.withConverter(this.converter),
        id
      );
      return setDoc(docRef, document)
        .then(() => document)
        .catch((error) => error);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Creates a document with a generated ID
   * Returns the document created.
   * @param document
   */
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

  /**
   * Reads a document by ID.
   * Returns the document if it exists, otherwise returns null.
   * @param documentId
   */
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

  /**
   * Updates a document by ID.
   * Returns void or an error if the document does not exist.
   * @param documentId
   * @param document
   */
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

  /**
   * Deletes a document by ID.
   * Returns void or an error if the document does not exist.
   * @param documentId
   */
  public async delete(documentId: string): Promise<void> {
    try {
      const docRef = doc(this.collectionReference, documentId);
      return deleteDoc(docRef);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Lists all documents in a collection.
   * TODO: Add query support
   */
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
