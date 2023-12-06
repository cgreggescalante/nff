import { EventWithMetadata } from '@shared-data';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface EventCardProps {
  event: EventWithMetadata;
}

export const EventCard = ({ event }: EventCardProps) => (
  <Card style={{ marginTop: '2%' }}>
    <Link
      to={`/events/${event.uid}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card.Header as={'h3'}>{event.name}</Card.Header>
    </Link>

    <Card.Body>
      <Card.Text>{event.description}</Card.Text>
      <Card.Text>
        Event Dates: {event.startDate.toDateString()} to{' '}
        {event.endDate.toDateString()}
      </Card.Text>
      <Card.Text>
        Registration Dates: {event.registrationStart.toDateString()} to{' '}
        {event.registrationEnd.toDateString()}
      </Card.Text>
      <Card.Text>Registered Users: {event.entryRefs.length}</Card.Text>
    </Card.Body>
  </Card>
);

export default EventCard;
