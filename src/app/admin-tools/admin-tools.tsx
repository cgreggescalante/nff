import styles from './admin-tools.module.scss';
import { useEffect } from 'react';
import { useUser } from '../../userContext';
import { useNavigate } from 'react-router-dom';
import ManageUsers from './manage-users/manage-users';

export const AdminTools = () => {
  const { user, loading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.role !== 'admin') navigate('/');
  }, [user, navigate, loading]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminTools!</h1>

      <ManageUsers user={user} loading={loading} />
    </div>
  );
};

export default AdminTools;
