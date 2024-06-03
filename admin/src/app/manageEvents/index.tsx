import { useEffect, useState } from 'react';
import { EventWithMetadata, listEvents } from '@shared-data';
import { deleteEvent } from '@shared-data';
import CreateEvent from './createEvent';
import { toast } from 'react-toastify';
import { Button, Modal, ModalClose, ModalDialog, Table } from '@mui/joy';
import { ConfirmPopup } from 'common-react';
import EditEvent from '../editEvent';

export default () => {
  const [selectedEvent, setSelectedEvent] = useState<EventWithMetadata>();
  const [events, setEvents] = useState<EventWithMetadata[]>();
  const [error, setError] = useState<string>();
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);

  useEffect(() => {
    listEvents().then(setEvents);
  }, []);
  if (!events) return <p>No events found</p>;

  const handleDelete = (uid: string) => {
    const event = events.find((e) => e.uid === uid);
    if (!event) return;
    deleteEvent(event)
      .then(() => {
        toast.success('Event deleted');
      })
      .catch((error) => {
        console.error('Error while deleting Event:', error);
        setError(error.message);
      });
  };

  return (
    <div>
      {selectedEvent && (
        <Modal open={true} onClose={() => setSelectedEvent(null)}>
          <ModalDialog>
            <ModalClose />
            <EditEvent event={selectedEvent} />
          </ModalDialog>
        </Modal>
      )}
      <Table borderAxis={'bothBetween'}>
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
              onEdit={() => setSelectedEvent(event)}
              onDelete={() => handleDelete(event.uid ? event.uid : '')}
            />
          ))}
          <tr>
            <td colSpan={3}>
              <Button
                color={'success'}
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
};

interface EventRowProps {
  event: EventWithMetadata;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const EventRow = ({ event, index, onDelete, onEdit }: EventRowProps) => {
  const [show, setShow] = useState<boolean>(false);
  const onConfirm = () => {
    setShow(false);
    onDelete();
  };

  return (
    <tr key={index}>
      <td>
        <Button size={'sm'} color={'danger'} onClick={() => setShow(true)}>
          Delete
        </Button>
        <Button size={'sm'} onClick={onEdit}>
          Edit
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
