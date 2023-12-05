import ManageUsers from './manage-users/manage-users';
import ManageEvents from './manage-events/manage-events';
import CollapsibleContainer from './collapsible-container/collapsible-container';

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
    </div>
  );
};

export default AdminTools;
