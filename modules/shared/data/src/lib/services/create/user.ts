import { auth } from '../../firebase';
import { setDoc } from '@firebase/firestore';
import { getUserRef } from '../CollectionRefs';

export const createUserFromAuth = async (firstName = '', lastName = '') => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userRef = getUserRef(user.uid);

  await setDoc(userRef, {
    firstName,
    lastName,
  });
};
