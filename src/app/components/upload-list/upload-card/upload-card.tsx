import { Card, Table, Typography } from '@mui/joy';
import { Upload } from '@shared-data';
import Grid from '@mui/material/Grid';

export interface UploadCardProps {
  upload: Upload;
}

export const UploadCard = ({ upload }: UploadCardProps) => (
  <Card style={{ marginBottom: '3%' }}>
    <Grid container alignItems={'flex-end'} spacing={2}>
      <Grid item>
        {upload.userFirstName && upload.userLastName ? (
          <Typography level={'h4'}>
            {upload.userFirstName} {upload.userLastName}
          </Typography>
        ) : (
          'Anonymous User'
        )}
      </Grid>
      <Grid item>
        <Typography level={'body-md'} style={{ paddingBottom: '1px' }}>
          {upload.date.toDateString()}
        </Typography>
      </Grid>
    </Grid>

    <Table size={'lg'} variant={'outlined'} borderAxis={'bothBetween'}>
      <tbody>
        {Object.entries(upload.workouts).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
);
