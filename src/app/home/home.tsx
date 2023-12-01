import { LoadingWrapper } from '@shared-ui';
import UploadList from '../components/upload-list/upload-list';
import useUser from '../../providers/useUser';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

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

      <Button onClick={() => toast('Hello World!', { type: 'success' })}>
        Toast
      </Button>
      <UploadList />
    </>
  );
};

export default Home;
