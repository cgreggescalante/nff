import { LoadingWrapper } from '@shared-ui';
import useUser from '../../providers/useUser';
import UploadList from '../components/upload-list/upload-list';

export const UserDashboard = () => {
  const { user, loading } = useUser();

  return (
    <>
      <h1>Dashboard</h1>

      <LoadingWrapper loading={loading}>
        {user ? (
          <div>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <h6>{user.uid}</h6>
            <h2>My Uploads</h2>
            <UploadList uid={user.uid} />
          </div>
        ) : (
          <h2>No user data found</h2>
        )}
      </LoadingWrapper>
    </>
  );
};

export default UserDashboard;
