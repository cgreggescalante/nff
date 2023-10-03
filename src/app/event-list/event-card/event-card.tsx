import { Event } from '@shared-data';
import { Card } from 'react-bootstrap';

export interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <Card.Header>{event.name}</Card.Header>
    </Card>
  );
}

export default EventCard;
