import useCurrentUser from '../../providers/useUser';
import UploadList from '../components/upload-list/upload-list';

export const UserDashboard = () => {
  const userInfo = useCurrentUser();

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <h3>
          {userInfo.firstName} {userInfo.lastName}
        </h3>
        <h6>{userInfo.uid}</h6>
        <h2>My Uploads</h2>
        <UploadList uid={userInfo.uid} />
      </div>
    </>
  );
};

export default UserDashboard;
