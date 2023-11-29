import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import { doc, getDoc } from '@firebase/firestore';

export const CheckAdminStatus = async (userUid: string): Promise<boolean> => {
  const adminRef = doc(collection(db, 'admins'), userUid);

  return getDoc(adminRef)
    .then((doc) => {
      return doc.exists();
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
