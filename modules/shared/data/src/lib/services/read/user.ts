import { getUserRef, UserCollectionRef } from '../CollectionRefs';
import { listDocuments, readDocument, withMetaData } from './all';
import {
  EntryWithMetaData,
  EventWithMetadata,
  UserInfoWithMetaData,
} from '../../models';
import { runTransaction } from '@firebase/firestore';
import { db } from '../../firebase';

export const readUser = readDocument(getUserRef);

export const listUsers = listDocuments(UserCollectionRef);

export const getUsersByEvent = async (
  event: EventWithMetadata
): Promise<{ user: UserInfoWithMetaData; entry: EntryWithMetaData }[]> => {
  const userData: {
    user: UserInfoWithMetaData;
    entry: EntryWithMetaData;
  }[] = [];

  await runTransaction(db, async (transaction) => {
    for (const entryRef of event.entryRefs) {
      const entrySnapshot = await transaction.get(entryRef);
      if (entrySnapshot.exists()) {
        const entry = withMetaData(entrySnapshot);
        const user = await transaction.get(entry.userRef);
        if (user.exists()) {
          userData.push({
            user: withMetaData(user),
            entry,
          });
        }
      }
    }
  });

  return userData;
};
