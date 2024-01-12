import useCurrentUser from '../../providers/useUser';
import { Stack, Typography } from '@mui/joy';
import { UploadList } from '../components';

export const UserDashboard = () => {
  const userInfo = useCurrentUser();

  return (
    <Stack spacing={2}>
      <Typography level={'h1'}>Dashboard</Typography>

      <Typography level={'h3'}>
        {userInfo.firstName} {userInfo.lastName}
      </Typography>
      <Typography level={'h2'}>My Uploads</Typography>
      <UploadList uid={userInfo.uid} />
    </Stack>
  );
};

export default UserDashboard;
