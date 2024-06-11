import { deleteDoc } from 'firebase/firestore';
import { UploadWithMetaData } from '../../models';

export const deleteUpload = async (
  upload: UploadWithMetaData
): Promise<void> => {
  return deleteDoc(upload.ref);
};
