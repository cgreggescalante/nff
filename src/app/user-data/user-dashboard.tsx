import useCurrentUser from '../../providers/useUser';
import { Typography } from '@mui/joy';
import { UploadList } from '../components';

export const UserDashboard = () => {
  const userInfo = useCurrentUser();

  return (
    <>
      <Typography level={'h1'}>Dashboard</Typography>

      <div>
        <Typography level={'h3'}>
          {userInfo.firstName} {userInfo.lastName}
        </Typography>
        <h6>{userInfo.uid}</h6>
        <h2>My Uploads</h2>
        <UploadList uid={userInfo.uid} />
      </div>
    </>
  );
};

export default UserDashboard;
