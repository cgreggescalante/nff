import { Card, Typography } from '@mui/joy';
import { EventWithMetadata } from '@shared-data';
import { Link as RouterLink } from 'react-router-dom';

export interface EventCardProps {
  event: EventWithMetadata;
}

export const EventCard = ({ event }: EventCardProps) => (
  <Card
    component={(props) => (
      <RouterLink
        {...props}
        to={`${event.uid}`}
        style={{ textDecoration: 'none' }}
      />
    )}
  >
    <Typography level={'h3'}>{event.name}</Typography>

    <Typography level={'body-md'}>{event.description}</Typography>

    <Typography level={'body-md'}>
      Event Dates: {event.startDate.toDateString()} to{' '}
      {event.endDate.toDateString()}
    </Typography>
    <Typography level={'body-md'}>
      Registration Dates: {event.registrationStart.toDateString()} to{' '}
      {event.registrationEnd.toDateString()}
    </Typography>
    <Typography level={'body-md'}>
      Registered Users: {event.entryRefs.length}
    </Typography>
  </Card>
);

export default EventCard;
