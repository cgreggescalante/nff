import { useUser } from '../../../userContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import UploadList from '../../components/upload-list/upload-list';

export const UserDashboard = () => {
  const { user, loading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      console.log(loading, user);
      navigate('/login');
    }
  }, [user, loading, navigate]);

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
