import { FirestoreDataConverter } from 'firebase/firestore';
import UserInfo from '../models/UserInfo';

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => Object.assign({}, user),
  fromFirestore: (snapshot, options): UserInfo => {
    const user = snapshot.data(options) as UserInfo;
    return user;
  },
};
