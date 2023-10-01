import styles from './upload-list.module.scss';
import { useEffect, useState } from 'react';
import { UploadCard } from './upload-card/upload-card';
import { Upload, UploadService } from '@shared-data';

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
    <div className={styles['container']}>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        uploads.map((upload, index) => (
          <UploadCard key={index} upload={upload} />
        ))
      )}
    </div>
  );
}

export default UploadList;
