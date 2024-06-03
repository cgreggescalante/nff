// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Button, Stack, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import {
  auth,
  createDraftTestData,
  createTestData,
  createUploads,
} from '@shared-data';
import ManageMessages from './manageMessages';
import ManageEvents from './manageEvents';
import { useAuth } from 'common-react';
import Login from './login';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export function App() {
  const { isAdmin, user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Login />;

  if (!isAdmin) {
    window.location.replace('http://notfantasyfitness.web.app');
  }

  const signout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Signed out successfully');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Stack direction={'row'} spacing={1}>
        <h1>Admin Tools</h1>
        <Box flexGrow={1} />
        <Button
          onClick={() =>
            window.location.replace('http://notfantasyfitness.web.app')
          }
        >
          Go to App
        </Button>
        <Button onClick={signout}>Sign Out</Button>
      </Stack>

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
