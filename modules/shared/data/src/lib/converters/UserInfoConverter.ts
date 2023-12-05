import { FirestoreDataConverter } from 'firebase/firestore';
import UserInfo, { UserInfoWithUid } from '../models/UserInfo';

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => Object.assign({}, user),
  fromFirestore: (snapshot, options): UserInfoWithUid => {
    return { ...(snapshot.data(options) as UserInfo), uid: snapshot.id };
  },
};
