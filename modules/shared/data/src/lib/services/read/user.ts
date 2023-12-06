import { UserInfoWithUid } from '../../models/UserInfo';
import { getDocs } from 'firebase/firestore';
import { getUserRef, UserCollectionRef } from '../CollectionRefs';
import { UserInfoConverter } from '../../converters/UserInfoConverter';
import { getDoc } from '@firebase/firestore';

export const readUser = async (
  uid: string
): Promise<UserInfoWithUid | null> => {
  const user = await getDoc(getUserRef(uid));
  return user.exists() ? { ...user.data(), uid } : null;
};

export const listUsers = async (): Promise<UserInfoWithUid[]> => {
  const users = await getDocs(UserCollectionRef);
  return users.docs.map(
    (doc) => UserInfoConverter.fromFirestore(doc) as UserInfoWithUid
  );
};
