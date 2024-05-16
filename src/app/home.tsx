import { ActivityList } from '../components';
import Typography from '@mui/joy/Typography';
import { Option, Select, Stack } from '@mui/joy';
import { useState } from 'react';
import useAuth from '../providers/useAuth';
import ContentBox from '../components/contentBox';

export default () => {
  const [activityFilter, setActivityFilter] = useState(0);
  const { user } = useAuth();

  return (
    <ContentBox maxWidth={500}>
      <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
        <Typography level={'h2'}>Recent Activities</Typography>

        <Select
          sx={{ width: '150px' }}
          value={activityFilter}
          onChange={(_, value) => setActivityFilter(value || 0)}
        >
          <Option value={0}>All Activities</Option>
          <Option value={1}>My Activities</Option>
        </Select>
      </Stack>

      <ActivityList uid={user && activityFilter ? user.uid : undefined} />
    </ContentBox>
  );
};
