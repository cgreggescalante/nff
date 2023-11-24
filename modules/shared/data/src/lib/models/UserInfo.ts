import { DocumentReference } from 'firebase/firestore';

export interface UserInfo {
  name: {
    firstName: string;
    lastName: string;
  };
  uid: string;
  role: string;
  entries: DocumentReference[];
  totalPoints: number;
}

export default UserInfo;
