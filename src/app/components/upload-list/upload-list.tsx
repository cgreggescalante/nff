import { UploadCard } from './upload-card/upload-card';
import { LoadingWrapper } from '@shared-ui';
import { useListRecentUploads } from '../../../providers/queries/useListRecentUploads';

export interface UploadListProps {
  uid?: string;
}

export function UploadList({ uid }: UploadListProps) {
  const { data: uploads, isLoading } = useListRecentUploads({
    userUid: uid,
    count: 25,
  });

  return (
    <LoadingWrapper loading={isLoading}>
      {uploads?.map((upload, index) => (
        <UploadCard key={index} upload={upload} />
      ))}
    </LoadingWrapper>
  );
}

export default UploadList;
