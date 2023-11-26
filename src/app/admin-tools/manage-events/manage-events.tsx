import { useEffect, useState } from 'react';
import type { Event } from '@shared-data';
import { Button, Table } from 'react-bootstrap';
import { EventService } from '@shared-data';
import { ConfirmDelete } from '../confirm-delete/confirm-delete';
import CreateEvent from './create-event/create-event';
import ManagedTextInput from '../../components/managed-text-input/managed-text-input';

export function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>();
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);

  useEffect(() => {
    EventService.list().then((events) => setEvents(events));
  }, []);

  const deleteEvent = (uid: string) => {
    EventService.delete(uid)
      .then(() => {
        console.log('Deleted event');
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
              onDelete={() => deleteEvent(event.uid ? event.uid : '')}
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
  event: Event;
  index: number;
  onDelete: () => void;
}

const EventRow = ({ event, index, onDelete }: EventRowProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [showCreateTeam, setShowCreateTeam] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>('');

  const onConfirm = () => {
    setShow(false);
    onDelete();
  };

  const addTeam = () => {
    EventService.addTeam(event.uid, teamName)
      .then(() => {
        console.log(`Added team ${teamName} to event ${event.name}`);
        setShowCreateTeam(false);
      })
      .catch((error) => {
        console.error('Error while adding team:', error);
      });
  };

  return (
    <>
      <tr key={index}>
        <td>
          <Button size={'sm'} variant={'danger'} onClick={() => setShow(true)}>
            Delete
          </Button>
          <Button
            size={'sm'}
            variant={'success'}
            onClick={() => setShowCreateTeam(true)}
          >
            Add Team
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
      <tr>
        <td colSpan={3}>
          {showCreateTeam && (
            <>
              <ManagedTextInput value={teamName} setValue={setTeamName} />
              <Button onClick={addTeam}>Add</Button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default ManageEvents;
