import { useEffect, useState } from 'react';
import { UploadCard } from './upload-card/upload-card';
import { Upload, UploadService } from '@shared-data';
import LoadingWrapper from '../loading-wrapper/loading-wrapper';

export interface UploadListProps {
  uid?: string;
}

export function UploadList({ uid }: UploadListProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    UploadService.getRecent({ uid }).then((uploads) => {
      setUploads(uploads);
      setLoading(false);
    });
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
