import { db } from '../firebase';
import {
  doc,
  collection,
  collectionGroup,
  CollectionReference,
  DocumentReference,
  FirestoreDataConverter,
} from '@firebase/firestore';
import {
  EntryConverter,
  EventConverter,
  TeamConverter,
  UploadConverter,
  UserInfoConverter,
} from '../converters';

export const EventCollectionRef = collection(db, 'events').withConverter(
  EventConverter
);
export const UserCollectionRef = collection(db, 'users').withConverter(
  UserInfoConverter
);
export const EntryCollectionRef = collectionGroup(db, 'entries').withConverter(
  EntryConverter
);
export const UploadCollectionRef = collectionGroup(db, 'uploads').withConverter(
  UploadConverter
);

/**
 * Returns the Firestore DocumentReference for the given document name
 */
export type GetDocumentReference<T> = (
  documentName: string
) => DocumentReference<T>;

/**
 * Given a collection reference, returns a function that takes a document name and returns a DocumentReference
 * @param collectionReference - A reference to the collection to return DocumentReferences from
 */
const getDocumentReference =
  <T>(collectionReference: CollectionReference<T>): GetDocumentReference<T> =>
  (documentName: string) =>
    doc(collectionReference, documentName);

/**
 * Returns the Firestore DocumentReference from a subcollection when given the parent document name and the subcollection document name
 */
type GetSubCollectionDocumentReference<T> = (
  parentDocumentName: string,
  documentName: string
) => DocumentReference<T>;

/**
 * Given a collection reference, subcollection name, and converter, returns a function that takes a parent document name and a document name and returns a DocumentReference
 * @param parentCollectionReference - A reference to the parent collection
 * @param subCollectionName - The name of the subcollection to return DocumentReferences from
 * @param converter - The converter to use for the DocumentReferences
 */
const getSubCollectionDocumentReference =
  <T>(
    parentCollectionReference: CollectionReference,
    subCollectionName: string,
    converter: FirestoreDataConverter<T>
  ): GetSubCollectionDocumentReference<T> =>
  (parentDocumentId: string, documentName: string) => {
    return doc(
      parentCollectionReference,
      parentDocumentId,
      subCollectionName,
      documentName
    ).withConverter(converter);
  };

/**
 * Returns the Firestore CollectionReference for the given collection name
 */
type GetSubCollectionReference<T> = (
  parentDocumentName: string
) => CollectionReference<T>;

/**
 * Given a collection reference, subcollection name, and converter, returns a function that takes a parent document name and returns the CollectionReference for the specified subcollection
 * @param parentCollectionReference - A reference to the parent collection
 * @param subCollectionName - The name of the subcollection to return a CollectionReference for
 * @param converter - The converter to use for the CollectionReferences
 */
const getSubCollectionReference =
  <T>(
    parentCollectionReference: CollectionReference,
    subCollectionName: string,
    converter: FirestoreDataConverter<T>
  ): GetSubCollectionReference<T> =>
  (parentDocumentName: string) =>
    collection(
      parentCollectionReference,
      parentDocumentName,
      subCollectionName
    ).withConverter(converter);

export const getUserRef = getDocumentReference(UserCollectionRef);
export const getEventRef = getDocumentReference(EventCollectionRef);

export const getEntryRef = getSubCollectionDocumentReference(
  UserCollectionRef,
  'entries',
  EntryConverter
);

export const getTeamRef = getSubCollectionDocumentReference(
  EventCollectionRef,
  'teams',
  TeamConverter
);

export const getEntryCollectionRef = getSubCollectionReference(
  UserCollectionRef,
  'entries',
  EntryConverter
);

export const getTeamCollectionRef = getSubCollectionReference(
  EventCollectionRef,
  'teams',
  TeamConverter
);

export const getUploadCollectionRef = getSubCollectionReference(
  UserCollectionRef,
  'uploads',
  UploadConverter
);
