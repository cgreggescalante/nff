import { FirestoreDataConverter } from 'firebase/firestore';
import UserInfo from '../models/UserInfo';

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => ({
    name: user.name,
    uid: user.uid,
    role: user.role,
    totalPoints: user.totalPoints,
    registeredEvents: user.registeredEvents,
  }),
  fromFirestore: (snapshot, options): UserInfo => {
    return snapshot.data(options) as UserInfo;
  },
};
