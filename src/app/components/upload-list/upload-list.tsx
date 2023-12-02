import { useEffect, useState } from 'react';
import { UploadCard } from './upload-card/upload-card';
import { listRecentUploads, Upload } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';

export interface UploadListProps {
  uid?: string;
}

export function UploadList({ uid }: UploadListProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listRecentUploads({ userUid: uid })
      .then((uploads) => {
        setUploads(uploads);
      })
      .catch((error) => {
        console.error('Error while fetching uploads:', error);
      })
      .finally(() => setLoading(false));
  }, [uid]);

  return (
    <LoadingWrapper loading={loading}>
      {uploads.map((upload, index) => (
        <UploadCard key={index} upload={upload} />
      ))}
    </LoadingWrapper>
  );
}

export default UploadList;
