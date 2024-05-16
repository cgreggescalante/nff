import { UploadList } from '../components';
import Typography from '@mui/joy/Typography';
import { Select, Option } from '@mui/joy';
import { useState } from 'react';
import useAuth from '../providers/useAuth';

export default () => {
  const [activityFilter, setActivityFilter] = useState(0);
  const { user } = useAuth();

  return (
    <>
      <Typography level={'h2'} mb={1}>
        Recent Activities
      </Typography>

      <Select
        sx={{ mb: 1, width: '150px' }}
        value={activityFilter}
        onChange={(_, value) => setActivityFilter(value || 0)}
      >
        <Option value={0}>All Activities</Option>
        <Option value={1}>My Activities</Option>
      </Select>

      <UploadList uid={user && activityFilter ? user.uid : undefined} />
    </>
  );
};
