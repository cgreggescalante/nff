import { UploadCard } from './upload-card';
import { LoadingWrapper } from '@shared-ui';
import { useListRecentUploads } from '../../providers/queries';
import { Stack } from '@mui/joy';

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
      <Stack spacing={3} sx={{ maxWidth: '500px' }}>
        {uploads?.map((upload, index) => (
          <UploadCard key={index} upload={upload} />
        ))}
      </Stack>
    </LoadingWrapper>
  );
}

export default UploadList;
