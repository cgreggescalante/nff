import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import { doc, getDoc } from '@firebase/firestore';
import { getEventRef } from './CollectionRefs';

export const CheckAdminStatus = async (userUid: string): Promise<boolean> => {
  const adminRef = doc(collection(db, 'admins'), userUid);

  return getDoc(adminRef)
    .then((doc) => {
      return doc.exists();
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

export const CheckIsEventOwner = async (
  userUid: string,
  eventUid: string
): Promise<boolean> => {
  const eventRef = getEventRef(eventUid);

  const ownerRef = doc(eventRef, 'owners', userUid);

  return getDoc(ownerRef)
    .then((doc) => {
      return doc.exists();
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
