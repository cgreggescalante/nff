import { Event } from '@shared-data';
import { Card } from 'react-bootstrap';

export interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => (
  <Card style={{ marginTop: '2%' }}>
    <Card.Header as={'h3'}>{event.name}</Card.Header>
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
      <Card.Text>Registered Users: {event.registeredUsers.length}</Card.Text>
    </Card.Body>
  </Card>
);

export default EventCard;
