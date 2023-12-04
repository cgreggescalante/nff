import ManageUsers from './manage-users/manage-users';
import ManageEvents from './manage-events/manage-events';
import CollapsibleContainer from './collapsible-container/collapsible-container';
import { Button } from 'react-bootstrap';
import {
  generateEvents,
  generateUploads,
  generateUsers,
  registerUsers,
} from '@shared-data';

export const AdminTools = () => {
  return (
    <div>
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
    </div>
  );
};

export default AdminTools;
