import { Card, Table, Typography } from '@mui/joy';
import { getUnitType, Upload } from '@shared-data';
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
        {Object.entries(upload.workouts).map(([workout, value]) => (
          <tr key={workout}>
            <td>{workout}</td>
            <td>
              {value} {getUnitType(workout) === 'time' ? 'minutes' : 'miles'}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
);
