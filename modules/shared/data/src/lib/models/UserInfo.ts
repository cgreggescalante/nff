import { DocumentReference } from 'firebase/firestore';

export interface UserInfo {
  name: {
    firstName: string;
    lastName: string;
  };
  uid: string;
  role: string;
  registeredEvents: DocumentReference[];
  totalPoints: number;
}

export default UserInfo;
