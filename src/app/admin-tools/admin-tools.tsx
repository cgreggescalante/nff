import styles from './admin-tools.module.scss';
import ManageUsers from './manage-users/manage-users';
import ManageEvents from './manage-events/manage-events';
import CollapsibleContainer from './collapsible-container/collapsible-container';
import { Button } from 'react-bootstrap';
import {
  Entry,
  EntryConverter,
  EntryService,
  generateEvents,
  generateUploads,
  generateUsers,
  registerUsers,
} from '@shared-data';
import {
  EventCollectionRef,
  TeamCollectionRef,
  UserCollectionRef,
} from '@shared-data';
import { doc } from '@firebase/firestore';

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
      <Button onClick={() => registerUsers()}>Register Users for Events</Button>
      <Button onClick={() => generateUploads()}>Generate Uploads</Button>
      <Button
        onClick={async () => {
          const testEntry: Entry = {
            userRef: doc(UserCollectionRef, 'test-user'),
            eventRef: doc(EventCollectionRef, 'test-event'),
            teamRef: doc(TeamCollectionRef, 'test-team'),
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
