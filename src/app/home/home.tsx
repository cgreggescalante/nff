import { LoadingWrapper } from '@shared-ui';
import UploadList from '../components/upload-list/upload-list';
import useUser from '../../providers/useUser';

const Home = () => {
  const { user, loading } = useUser();

  return (
    <>
      <LoadingWrapper loading={loading}>
        {user ? (
          <>
            <h3>Current User</h3>
            {user.uid} {user.firstName} {user.lastName}
          </>
        ) : (
          <h3>No Current User</h3>
        )}
      </LoadingWrapper>

      <UploadList />
    </>
  );
};

export default Home;
