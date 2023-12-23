import { Card, Typography, Link } from '@mui/joy';
import { EventWithMetadata } from '@shared-data';

export interface EventCardProps {
  event: EventWithMetadata;
}

export const EventCard = ({ event }: EventCardProps) => (
  <Card style={{ marginTop: '2%' }}>
    <Link
      overlay
      href={`/events/${event.uid}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Typography level={'h3'}>{event.name}</Typography>
    </Link>

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
