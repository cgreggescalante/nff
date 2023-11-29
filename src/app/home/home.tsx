import { useUser } from '../../userContext';
import LoadingWrapper from '../components/loading-wrapper/loading-wrapper';
import UploadList from '../components/upload-list/upload-list';

const Home = () => {
  const { user, loading } = useUser();

  return (
    <>
      <LoadingWrapper loading={loading}>
        {user ? (
          <>
            <h3>Current User</h3>
            {user.uid} {user.name.firstName} {user.name.lastName}
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
