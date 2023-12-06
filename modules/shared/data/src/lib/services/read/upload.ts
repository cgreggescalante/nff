import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
} from '@firebase/firestore';
import { getUploadCollectionRef } from '../CollectionRefs';
import { db } from '../../firebase';
import UploadConverter from '../../converters/UploadConverter';
import { WithMetaData } from '../../models/Models';
import Upload from '../../models/Upload';
import { withMetaData } from './all';

export const listRecentUploads = async ({
  userUid,
  count,
}: {
  userUid?: string;
  count?: number;
}): Promise<(Upload & WithMetaData<Upload>)[]> => {
  let uploadQuery;

  if (userUid)
    uploadQuery = query(
      getUploadCollectionRef(userUid),
      orderBy('date', 'desc'),
      limit(count === undefined ? 25 : count)
    );
  else
    uploadQuery = query(
      collectionGroup(db, 'uploads'),
      orderBy('date', 'desc'),
      limit(count === undefined ? 25 : count)
    );

  const snapshot = await getDocs(uploadQuery.withConverter(UploadConverter));

  return snapshot.docs.map((doc) => withMetaData(doc));
};
