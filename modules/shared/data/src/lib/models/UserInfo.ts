import { DocumentReference } from 'firebase/firestore';
import Entry from './Entry';

// TODO: remove uid from UserInfo
export interface UserInfo {
  name: {
    firstName: string;
    lastName: string;
  };
  uid: string;
  entryRefs: DocumentReference<Entry>[];
}

export interface UserInfoWithEntries extends UserInfo {
  entries: Entry[];
}

export default UserInfo;
