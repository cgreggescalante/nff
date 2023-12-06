import { WithMetaData } from './Models';

export interface UserInfo {
  firstName: string;
  lastName: string;
}

export type UserInfoWithMetaData = UserInfo & WithMetaData<UserInfo>;

export default UserInfo;
