// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Button, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import {
  createDraftTestData,
  createTestData,
  createUploads,
} from '@shared-data';
import ManageMessages from './manageMessages';
import ManageEvents from './manageEvents';

export function App() {
  return (
    <Box>
      <h1>Admin Tools</h1>

      <Button onClick={createTestData}>Create Test Data</Button>
      <Button onClick={createUploads}>Create Upload Data</Button>
      <Button onClick={createDraftTestData}>Create Draft Data</Button>

      <Tabs defaultValue={0}>
        <TabList>
          <Tab>Events</Tab>
          <Tab>Messages</Tab>
        </TabList>
        <TabPanel value={0}>
          <ManageEvents />
        </TabPanel>
        <TabPanel value={1}>
          <ManageMessages />
        </TabPanel>
      </Tabs>
    </Box>
  );
}

export default App;
