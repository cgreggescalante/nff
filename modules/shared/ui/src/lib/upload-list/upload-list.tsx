import styles from './upload-list.module.scss';
import { useEffect, useState } from "react";
import { UploadCard } from "../upload-card/upload-card";
import { Upload, UserInfo } from "@shared-data";
import {
  collection,
  limit,
  orderBy,
  query,
  Firestore,
  getDocs,
  getDoc,
} from 'firebase/firestore';

export interface UploadListProps {
  db: Firestore
}

export function UploadList({ db }: UploadListProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDocs(query(
      collection(db, "uploads").withConverter(Upload.converter),
      orderBy("date", "desc"),
      limit(25)
    ))
      .then(async snapshot => {
          const uploads = snapshot.docs.map(doc => doc.data());

          for (const upload of uploads) {
            upload.user = (await getDoc(upload.userRef.withConverter(UserInfo.converter))).data()
          }

          console.log(uploads);

          setUploads(uploads);
          setLoading(false);
        }
      );
  }, [db]);

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
