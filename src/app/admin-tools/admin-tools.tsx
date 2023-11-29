import styles from './admin-tools.module.scss';
import ManageUsers from './manage-users/manage-users';
import ManageEvents from './manage-events/manage-events';
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
  TeamService,
  UserInfoService,
} from '@shared-data';

export const AdminTools = () => {
  return (
    <div className={styles['container']}>
      <h1>Admin Tools</h1>

      <CollapsibleContainer title={'Users'}>
        <ManageUsers />
      </CollapsibleContainer>

      <CollapsibleContainer title={'Events'}>
        <ManageEvents />
      </CollapsibleContainer>

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
            teamRef: TeamService.getReference('test-team'),
            duration: { Run: 1 },
            goals: { Run: 1 },
            points: 1,
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
