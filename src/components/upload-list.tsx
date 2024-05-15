import { UploadCard } from './upload-card';
import { Stack, Typography } from '@mui/joy';
import { useListRecentUploads } from '../providers/queries';
import React from 'react';
import { LoadingWrapper } from './loading-wrapper';

export interface UploadListProps {
  uid?: string;
}

export const UploadList = ({ uid }: UploadListProps) => {
  const { data: uploads, isLoading } = useListRecentUploads({
    userUid: uid,
    count: 25,
  });

  return (
    <LoadingWrapper loading={isLoading}>
      <Stack spacing={3} sx={{ maxWidth: '500px' }}>
        {uploads && uploads.length === 0 ? (
          <Typography level={'h2'}>No uploads found</Typography>
        ) : (
          uploads?.map((upload, index) => (
            <UploadCard key={index} upload={upload} />
          ))
        )}
      </Stack>
    </LoadingWrapper>
  );
};
