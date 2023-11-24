import styles from './admin-tools.module.scss';
import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import { useNavigate } from 'react-router-dom';
import ManageUsers from './manage-users/manage-users';
import ManageEvents from './manage-events/manage-events';
import LoadingWrapper from '../components/loading-wrapper/loading-wrapper';
import CollapsibleContainer from './collapsible-container/collapsible-container';
import { Button } from 'react-bootstrap';
import {
  Entry,
  EntryConverter,
  EntryService,
  EventService,
  generateEvents,
  generateUploads,
  generateUsers,
  registerUsersForEvents,
  UserInfoService,
} from '@shared-data';

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

      <Button onClick={() => generateUsers()}>Generate 10 Users</Button>
      <Button onClick={() => generateEvents()}>Generate 1 Event</Button>
      <Button onClick={() => registerUsersForEvents()}>
        Register Users for Events
      </Button>
      <Button onClick={() => generateUploads()}>Generate Uploads</Button>
      <Button
        onClick={async () => {
          const testEntry: Entry = {
            uid: 'test',
            userRef: UserInfoService.getReference('test-user'),
            eventRef: EventService.getReference('test-event'),
            duration: { Run: 1 },
            goals: { Run: 1 },
          };

          await EntryService.set(
            'test-entry',
            EntryConverter.toFirestore(testEntry)
          );

          console.log('Added test entry');
        }}
      >
        Create Test Entry
      </Button>
    </div>
  );
};

export default AdminTools;
