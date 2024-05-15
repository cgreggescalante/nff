import EventCard from './event-card';
import { useListEvents } from '../../../providers/queries';
import { Stack, Typography } from '@mui/joy';
import { LoadingWrapper } from '../../../components';

export const EventList = () => {
  const { data: events, isLoading } = useListEvents();

  return (
    <div>
      <LoadingWrapper loading={isLoading}>
        <Stack spacing={2}>
          <Typography level={'h2'}>Events</Typography>
          {events?.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </Stack>
      </LoadingWrapper>
    </div>
  );
};

export default EventList;
