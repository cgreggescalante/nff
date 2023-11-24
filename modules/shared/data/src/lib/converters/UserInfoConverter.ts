import { FirestoreDataConverter } from 'firebase/firestore';
import UserInfo from '../models/UserInfo';

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => Object.assign({}, user),
  fromFirestore: (snapshot, options): UserInfo => {
    const user = snapshot.data(options) as UserInfo;
    if (!(Symbol.iterator in user.entries)) user.entries = [];
    return user;
  },
};
