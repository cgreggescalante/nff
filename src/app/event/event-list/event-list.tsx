import EventCard from './event-card';
import { LoadingWrapper } from '@shared-ui';
import { useListEvents } from '../../../providers/queries/useListEvents';
import { Typography } from '@mui/joy';

export const EventList = () => {
  const { data: events, isLoading } = useListEvents();

  return (
    <div>
      <Typography level={'h2'}>Events</Typography>

      <LoadingWrapper loading={isLoading}>
        {events?.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </LoadingWrapper>
    </div>
  );
};

export default EventList;
