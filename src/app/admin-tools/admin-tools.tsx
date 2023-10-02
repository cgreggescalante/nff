import styles from './admin-tools.module.scss';
import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import { useNavigate } from 'react-router-dom';
import ManageUsers from './manage-users/manage-users';
import ManageEvents from './manage-events/manage-events';
import LoadingWrapper from '../components/loading-wrapper/loading-wrapper';
import CollapsibleContainer from './collapsible-container/collapsible-container';
import { Accordion } from 'react-bootstrap';

export const AdminTools = () => {
  const { user, loading } = useUser();

  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.role !== 'admin') navigate('/');
    if (!loading && user?.role === 'admin') setAuthenticated(true);
  }, [user, navigate, loading]);

  return (
    <div className={styles['container']}>
      <h1>Admin Tools</h1>

      <LoadingWrapper loading={!authenticated}>
        <CollapsibleContainer title={'Users'}>
          <ManageUsers />
        </CollapsibleContainer>

        <CollapsibleContainer title={'Events'}>
          <ManageEvents />
        </CollapsibleContainer>
      </LoadingWrapper>
    </div>
  );
};

export default AdminTools;
