import { UploadCard } from './upload-card/upload-card';
import { LoadingWrapper } from '@shared-ui';
import { useListRecentUploads } from '../../../providers/queries/useListRecentUploads';

export interface UploadListProps {
  uid?: string;
}

export function UploadList({ uid }: UploadListProps) {
  const { data, isLoading, error } = useListRecentUploads({ userUid: uid });

  return (
    <LoadingWrapper loading={isLoading}>
      {data?.map((upload, index) => (
        <UploadCard key={index} upload={upload} />
      ))}
    </LoadingWrapper>
  );
}

export default UploadList;
