import { LoadingWrapper } from '@shared-ui';
import useUser from '../../providers/useUser';
import UploadList from '../components/upload-list/upload-list';

export const UserDashboard = () => {
  const { userInfo, isLoading } = useUser();

  return (
    <>
      <h1>Dashboard</h1>

      <LoadingWrapper loading={isLoading}>
        {userInfo ? (
          <div>
            <h3>
              {userInfo.firstName} {userInfo.lastName}
            </h3>
            <h6>{userInfo.uid}</h6>
            <h2>My Uploads</h2>
            <UploadList uid={userInfo.uid} />
          </div>
        ) : (
          <h2>No user data found</h2>
        )}
      </LoadingWrapper>
    </>
  );
};

export default UserDashboard;
