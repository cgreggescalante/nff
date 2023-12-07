import { LoadingWrapper } from '@shared-ui';
import UploadList from '../components/upload-list/upload-list';
import useUser from '../../providers/useUser';

const Home = () => {
  const { userInfo, isLoading } = useUser();

  return (
    <>
      <LoadingWrapper loading={isLoading}>
        {userInfo ? (
          <>
            <h3>Current User</h3>
            {userInfo.uid} {userInfo.firstName} {userInfo.lastName}
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
