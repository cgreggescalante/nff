import styles from './upload-list.module.scss';
import { useEffect, useState } from 'react';
import { UploadCard } from './upload-card/upload-card';
import { Upload, UploadService } from '@shared-data';

export function UploadList() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    UploadService.getRecent().then((uploads) => {
      setUploads(uploads);
      setLoading(false);
    });
  });

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
