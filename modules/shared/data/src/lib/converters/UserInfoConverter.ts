import { FirestoreDataConverter } from 'firebase/firestore';
import { UserInfo } from '../models/UserInfo';

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => ({
    name: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    uid: user.uid,
    role: user.role,
    totalPoints: user.totalPoints,
  }),
  fromFirestore: (snapshot, options): UserInfo => {
    const data = snapshot.data(options);
    return new UserInfo(
      data['name'] ? data['name']['firstName'] : '',
      data['name'] ? data['name']['lastName'] : '',
      snapshot.id,
      data['role'] ? data['role'] : '',
      data['totalPoints'] ? data['totalPoints'] : 0
    );
  },
};
