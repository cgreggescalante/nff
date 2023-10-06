import { useEffect, useState } from 'react';
import type { Event } from '@shared-data';
import { EventService } from '@shared-data';
import EventCard from './event-card/event-card';
import LoadingWrapper from '../components/loading-wrapper/loading-wrapper';

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    EventService.list()
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