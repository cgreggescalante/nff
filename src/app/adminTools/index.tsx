import ManageEvents from './manageEvents';
import { Button, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  createDraftTestData,
  createTestData,
  createUploads,
} from '../../../modules/shared/data/src/lib/testData/createTestData';
import ManageMessages from './manageMessages';

export default () => (
  <div>
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
  </div>
);
