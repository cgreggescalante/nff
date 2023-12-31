import { useEffect, useState } from 'react';
import type { EventWithMetadata } from '@shared-data';
import { Button, Table } from 'react-bootstrap';
import { deleteEvent, listEvents } from '@shared-data';
import CreateEvent from './create-event/create-event';
import { ConfirmPopup } from '@shared-ui';
import { toast } from 'react-toastify';

export function ManageEvents() {
  const [events, setEvents] = useState<EventWithMetadata[]>([]);
  const [error, setError] = useState<string>();
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);

  useEffect(() => {
    listEvents().then((events) => setEvents(events));
  }, []);

  const handleDelete = (uid: string) => {
    const event = events.find((e) => e.uid === uid);
    if (!event) return;
    deleteEvent(event)
      .then(() => {
        toast.success('Event deleted');
        setEvents(events.filter((e) => e.uid !== uid));
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
              onDelete={() => handleDelete(event.uid ? event.uid : '')}
            />
          ))}
          <tr>
            <td colSpan={3}>
              <Button
                variant={'success'}
                size={'sm'}
                onClick={() => setShowCreateEvent(true)}
              >
                Add Event
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {error && <p>{error}</p>}

      {showCreateEvent && (
        <CreateEvent completed={() => setShowCreateEvent(false)} />
      )}
    </div>
  );
}

interface EventRowProps {
  event: EventWithMetadata;
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
      <ConfirmPopup
        onConfirm={onConfirm}
        message={`Are you sure you want to delete event ${event.uid} and all associated entries?`}
        show={show}
        setShow={setShow}
        action={'Delete'}
      />
    </tr>
  );
};

export default ManageEvents;
