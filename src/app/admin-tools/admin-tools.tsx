import ManageEvents from './manage-events/manage-events';
import { Button, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  createDraftTestData,
  createTestData,
  createUploads,
} from '../../../modules/shared/data/src/lib/testData/createTestData';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@shared-data';

export const AdminTools = () => {
  const callableTest = () => {
    const helloCallable = httpsCallable(functions, 'helloCallable');

    helloCallable()
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Admin Tools</h1>

      <Button onClick={createTestData}>Create Test Data</Button>
      <Button onClick={createUploads}>Create Upload Data</Button>
      <Button onClick={createDraftTestData}>Create Draft Data</Button>

      <Button onClick={callableTest}>Test Functions</Button>

      <Tabs defaultValue={1}>
        <TabList>
          <Tab>Events</Tab>
        </TabList>
        <TabPanel value={1}>
          <ManageEvents />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminTools;
