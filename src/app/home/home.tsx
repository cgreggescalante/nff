import styles from './home.module.scss';
import { LoadingWrapper, UploadList } from '@shared-ui';
import { useUser } from '../../userContext';

const Home = () => {
  const { user, loading } = useUser();

  return (
    <div className={styles['container']}>
      <LoadingWrapper loading={loading}>
        {user ? (
          <>
            <h3>Current User</h3>
            {user.uid} {user.firstName} {user.lastName} {user.role}
          </>
        ) : (
          <h3>No Current User</h3>
        )}
      </LoadingWrapper>

      <UploadList />
    </div>
  );
};

export default Home;
