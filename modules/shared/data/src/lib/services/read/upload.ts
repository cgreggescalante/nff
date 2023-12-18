import { getDocsFromServer, limit, orderBy, query } from '@firebase/firestore';
import { getUploadCollectionRef, UploadCollectionRef } from '../CollectionRefs';
import { withMetaData } from './all';
import { UploadConverter } from '../../converters';
import { Upload, WithMetaData } from '../../models';

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
      UploadCollectionRef,
      orderBy('date', 'desc'),
      limit(count === undefined ? 25 : count)
    );

  const snapshot = await getDocsFromServer(
    uploadQuery.withConverter(UploadConverter)
  );

  return snapshot.docs.map((doc) => withMetaData(doc));
};
