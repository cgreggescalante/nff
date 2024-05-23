import { Card, Stack, Table, Typography } from '@mui/joy';
import { useListRecentUploads } from '../providers/queries';
import React from 'react';
import { LoadingWrapper } from './loading-wrapper';
import { getUnitType, Upload } from '@shared-data';
import Grid from '@mui/material/Grid';

export interface ActivityListProps {
  uid?: string;
}

const overkillNumberFormatter = (num: number) =>
  num > 10000
    ? num.toLocaleString(undefined, {
        notation: 'scientific',
      })
    : Math.round(num * 100) / 100;

export default ({ uid }: ActivityListProps) => {
  const { data: uploads, isLoading } = useListRecentUploads({
    userUid: uid,
    count: 25,
  });

  return (
    <LoadingWrapper loading={isLoading}>
      <Stack spacing={2}>
        {uploads && uploads.length === 0 ? (
          <Typography level={'h3'}>No uploads found</Typography>
        ) : (
          uploads?.map((upload, index) => (
            <UploadCard key={index} upload={upload} />
          ))
        )}
      </Stack>
    </LoadingWrapper>
  );
};

export interface UploadCardProps {
  upload: Upload;
}

const UploadCard = ({ upload }: UploadCardProps) => (
  <Card>
    <Grid container alignItems={'flex-end'} spacing={1}>
      <Grid item>
        <Typography level={'h4'} fontSize={'md'}>
          {upload.userDisplayName}
        </Typography>
      </Grid>

      <Grid item>
        <Typography level={'body-sm'} style={{ paddingBottom: '1px' }}>
          {upload.date.toDateString()}
        </Typography>
      </Grid>
    </Grid>

    {upload.description && (
      <Typography level={'body-sm'}>{upload.description}</Typography>
    )}

    <Table size={'sm'} variant={'outlined'} borderAxis={'bothBetween'}>
      <tbody>
        {Object.entries(upload.activities).map(([activity, value]) => (
          <tr key={activity}>
            <td>
              <Typography ml={1} level={'body-sm'}>
                {activity}
              </Typography>
            </td>
            <td>
              <Typography ml={1} level={'body-sm'}>
                {overkillNumberFormatter(value)}{' '}
                {getUnitType(activity) === 'time' ? 'minutes' : 'miles'}
              </Typography>
            </td>
            <td>
              <Typography ml={1} level={'body-sm'}>
                {overkillNumberFormatter(upload.activityPoints[activity])}
              </Typography>
            </td>
          </tr>
        ))}
        <tr>
          <td />
          <td style={{ borderLeft: 'none' }}>
            <Typography ml={1} level={'body-sm'}>
              Total Points :
            </Typography>
          </td>
          <td>
            <Typography ml={1} level={'body-sm'}>
              {overkillNumberFormatter(upload.points)}
            </Typography>
          </td>
        </tr>
      </tbody>
    </Table>
  </Card>
);
