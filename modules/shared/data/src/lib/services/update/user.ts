import { UserInfo } from '../../models';
import { getUserRef } from '../CollectionRefs';
import { updateDoc } from '@firebase/firestore';

export const updateUser = async (userUid: string, userInfo: UserInfo) => {
  const docRef = getUserRef(userUid);
  await updateDoc(docRef, { ...userInfo });
};
