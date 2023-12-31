import { useEffect, useState } from 'react';
import type { EventWithMetadata } from '@shared-data';
import { listEvents } from '@shared-data';
import EventCard from './event-card';
import { LoadingWrapper } from '@shared-ui';

export const EventList = () => {
  const [events, setEvents] = useState<EventWithMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listEvents()
      .then((events) => {
        setEvents(events);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error while loading events:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Events</h1>

      <LoadingWrapper loading={loading}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </LoadingWrapper>
    </div>
  );
};

export default EventList;
