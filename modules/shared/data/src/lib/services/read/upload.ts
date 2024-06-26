import {
  getDocsFromServer,
  limit,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
import { UploadCollectionRef } from '../CollectionRefs';
import { withMetaData } from './all';
import { UploadConverter } from '../../converters';
import { Upload, UploadWithMetaData, WithMetaData } from '../../models';

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
      UploadCollectionRef,
      where('userId', '==', userUid),
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

  return snapshot.docs.map((doc) => withMetaData(doc)) as UploadWithMetaData[];
};
