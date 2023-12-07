import EventCard from './event-card';
import { LoadingWrapper } from '@shared-ui';
import { useListEvents } from '../../../providers/queries/useListEvents';

export const EventList = () => {
  const { data: events, isLoading } = useListEvents();

  return (
    <div>
      <h1>Events</h1>

      <LoadingWrapper loading={isLoading}>
        {events?.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </LoadingWrapper>
    </div>
  );
};

export default EventList;
