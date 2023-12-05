import Entry from './Entry';
import { WithUid } from './Models';

// TODO: remove uid from UserInfo
export interface UserInfo {
  firstName: string;
  lastName: string;
}

export type UserInfoWithUid = UserInfo & WithUid;

export interface UserInfoWithEntries extends UserInfo {
  entries: Entry[];
}

export default UserInfo;
