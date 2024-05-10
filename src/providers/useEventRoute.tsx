import { useParams } from 'react-router-dom';
import { useEvent } from './queries';
import { Typography } from '@mui/joy';
import { createContext, ReactNode, useContext } from 'react';
import { EventWithMetadata } from '@shared-data';

const EventRouteContext = createContext({} as EventWithMetadata);

export default () => {
  return useContext(EventRouteContext);
};

export const EventRouteProvider = ({ children }: { children: ReactNode }) => {
  const { eventId } = useParams();

  if (!eventId) throw new Error('Event ID not provided');

  const { data: event, isLoading, error } = useEvent(eventId);

  if (isLoading) return <Typography level="h2">Loading...</Typography>;

  if (error || !event)
    return (
      <Typography level="h2">
        Could not load an event with ID: {eventId}
      </Typography>
    );

  return (
    <EventRouteContext.Provider value={event}>
      {children}
    </EventRouteContext.Provider>
  );
};
