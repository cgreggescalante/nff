import { Stack, Typography } from '@mui/joy';
import { UploadList } from '../components';
import useAuth from '../providers/useAuth';

export default () => {
  const { user } = useAuth();

  if (!user) return <Typography>No User</Typography>;

  return (
    <Stack spacing={2}>
      <Typography level={'h1'}>Dashboard</Typography>

      <Typography level={'h3'}>{user.displayName}</Typography>
      <Typography level={'h2'}>My Uploads</Typography>
      <UploadList uid={user?.uid} />
    </Stack>
  );
};
