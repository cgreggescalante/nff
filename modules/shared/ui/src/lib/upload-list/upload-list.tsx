import styles from './upload-list.module.scss';
import { useEffect, useState } from "react";
import { Upload, UploadCard } from "../upload-card/upload-card";

/* eslint-disable-next-line */
export interface UploadListProps {}

export function UploadList(props: UploadListProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3000/uploads?_sort=date&_order=desc&limit=20')
      .then((res) => res.json())
      .then(data => {
        setLoading(false);
        setUploads(data);
      })
  }, []);

  return (
    <div className={styles['container']}>
      {
        loading ? <h2>Loading...</h2> :
        uploads.map(upload =>
          <UploadCard upload={upload} />
        )
      }
    </div>
  );
}

export default UploadList;
