import ManageUsers from './manage-users';
import ManageEvents from './manage-events/manage-events';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';

export const AdminTools = () => {
  return (
    <div>
      <h1>Admin Tools</h1>

      <Tabs defaultValue={0}>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Events</Tab>
        </TabList>
        <TabPanel value={0}>
          <ManageUsers />
        </TabPanel>
        <TabPanel value={1}>
          <ManageEvents />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminTools;
