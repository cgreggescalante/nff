import { Card, Stack, Table, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { LoadingWrapper } from './loading-wrapper';
import { getUnitType, listRecentUploads, Upload } from '@shared-data';
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
  const [uploads, setUploads] = useState<Upload[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listRecentUploads({ userUid: uid, count: 25 })
      .then((uploads) => {
        setUploads(uploads);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [uid]);

  return (
    <LoadingWrapper loading={isLoading}>
      <Stack spacing={2}>
        {uploads && uploads.length === 0 ? (
          <Typography level={'h3'}>No uploads found</Typography>
        ) : (
          uploads?.map((upload, index) => (
            <ActivityCard key={index} upload={upload} />
          ))
        )}
      </Stack>
    </LoadingWrapper>
  );
};

export interface UploadCardProps {
  upload: Upload;
}

const ActivityCard = ({ upload }: UploadCardProps) => (
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
      <thead>
        <tr>
          <th>
            <Typography ml={1} level={'body-sm'}>
              Activity
            </Typography>
          </th>
          <th>
            <Typography ml={1} level={'body-sm'}>
              Duration
            </Typography>
          </th>
          <th>
            <Typography ml={1} level={'body-sm'}>
              Points
            </Typography>
          </th>
        </tr>
      </thead>
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
