import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import UserInfo, { UserInfoWithMetaData } from '../models/UserInfo';
import { withMetaData } from '../services/read/all';

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => Object.assign({}, user),
  fromFirestore: (snapshot, options): UserInfoWithMetaData =>
    withMetaData(snapshot as QueryDocumentSnapshot<UserInfo>, options),
};
