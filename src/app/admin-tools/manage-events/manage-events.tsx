import { useEffect, useState } from 'react';
import type { Event } from '@shared-data';
import { Button, Table } from 'react-bootstrap';
import { EventService } from '@shared-data';
import { ConfirmDelete } from '../confirm-delete/confirm-delete';

export function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    EventService.list().then((events) => setEvents(events));
  }, []);

  const deleteEvent = (event: Event) => {
    EventService.delete(event.uid)
      .then(() => {
        console.log('Deleted event');
        setEvents(events.filter((e) => e.uid !== event.uid));
      })
      .catch((error) => {
        console.error('Error while deleting Event:', error);
        setError(error.message);
      });
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>UID</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <EventRow
              key={index}
              event={event}
              index={index}
              onDelete={() => deleteEvent(event)}
            />
          ))}
          <tr>
            <td colSpan={3}>
              <Button variant={'success'} size={'sm'}>
                Add Event
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {error && <p>{error}</p>}
    </div>
  );
}

interface EventRowProps {
  event: Event;
  index: number;
  onDelete: () => void;
}

const EventRow = ({ event, index, onDelete }: EventRowProps) => {
  const [show, setShow] = useState<boolean>(false);

  const onConfirm = () => {
    setShow(false);
    onDelete();
  };

  return (
    <tr key={index}>
      <td>
        <Button size={'sm'} variant={'danger'} onClick={() => setShow(true)}>
          Delete
        </Button>
      </td>
      <td>{event.name}</td>
      <td>{event.uid}</td>
      <ConfirmDelete
        onConfirm={onConfirm}
        message={`Are you sure you want to delete event ${event.uid} and all associated entries?`}
        show={show}
        setShow={setShow}
      />
    </tr>
  );
};

export default ManageEvents;
