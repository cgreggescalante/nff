import {
  arrayRemove,
  doc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  where,
} from 'firebase/firestore';
import type UserInfo from '../models/UserInfo';
import { auth, db } from '../firebase';
import {
  EntryCollectionRef,
  EventCollectionRef,
  TeamCollectionRef,
  UploadCollectionRef,
  UserCollectionRef,
} from './CollectionRefs';
import { getDoc, updateDoc } from '@firebase/firestore';

export const deleteUser = async (userUid: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userRef = doc(UserCollectionRef, userUid);

  const uploadRefs = await getDocs(
    query(UploadCollectionRef, where('userRef', '==', userRef))
  );

  const entryRefs = await getDocs(
    query(EntryCollectionRef, where('userRef', '==', userRef))
  );

  const eventRefs = await getDocs(
    query(
      EventCollectionRef,
      where('registeredUserRefs', 'array-contains', userRef)
    )
  );

  const teamRefs = await getDocs(
    query(TeamCollectionRef, where('memberRefs', 'array-contains', userRef))
  );

  await runTransaction(db, async (transaction) => {
    transaction.delete(userRef);
    uploadRefs.forEach((uploadRef) => transaction.delete(uploadRef.ref));
    entryRefs.forEach((entryRef) => transaction.delete(entryRef.ref));
    eventRefs.forEach((eventRef) => {
      transaction.update(eventRef.ref, {
        registeredUserRefs: arrayRemove(userRef),
      });
    });
    teamRefs.forEach((teamRef) => {
      transaction.update(teamRef.ref, { memberRefs: arrayRemove(userRef) });
    });
  });
};

export const updateUser = async (userUid: string, userInfo: UserInfo) => {
  const docRef = doc(UserCollectionRef, userUid);
  await updateDoc(docRef, { ...userInfo });
};

export const createUserFromAuth = async (firstName = '', lastName = '') => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userRef = doc(UserCollectionRef, user.uid);

  await setDoc(userRef, {
    name: {
      firstName,
      lastName,
    },
    uid: user.uid,
    entryRefs: [],
  });
};

export const readUser = async (uid: string): Promise<UserInfo | null> => {
  const user = await getDoc(doc(UserCollectionRef, uid));
  return user.exists() ? { ...user.data(), uid } : null;
};

export const listUsers = async (): Promise<UserInfo[]> => {
  const users = await getDocs(UserCollectionRef);
  return users.docs.map((doc) => doc.data());
};

export const createUser = async (userInfo: UserInfo): Promise<void> => {
  const userRef = doc(UserCollectionRef, userInfo.uid);
  await setDoc(userRef, userInfo);
};
