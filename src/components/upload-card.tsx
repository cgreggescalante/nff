import { Card, Table, Typography } from '@mui/joy';
import { getUnitType, Upload, WorkoutType } from '@shared-data';
import Grid from '@mui/material/Grid';

export interface UploadCardProps {
  upload: Upload;
}

export const UploadCard = ({ upload }: UploadCardProps) => (
  <Card>
    <Grid container alignItems={'flex-end'} spacing={2}>
      <Grid item>
        <Typography level={'h4'}>{upload.userDisplayName}</Typography>
      </Grid>
      <Grid item>
        <Typography level={'body-md'} style={{ paddingBottom: '1px' }}>
          {upload.date.toDateString()}
        </Typography>
      </Grid>
    </Grid>

    <Table size={'md'} variant={'outlined'} borderAxis={'bothBetween'}>
      <tbody>
        {Object.entries(upload.workouts).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>
              {value} {getUnitType(key as WorkoutType)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
);
