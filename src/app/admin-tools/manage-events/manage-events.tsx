import { useEffect, useState } from 'react';
import type { Event } from '@shared-data';
import { Button, Table } from 'react-bootstrap';
import { EventService } from '@shared-data';

export function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    EventService.list().then((events) => setEvents(events));
  }, []);

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
            <tr key={index}>
              <td>
                <Button size={'sm'} variant={'danger'}>
                  Delete
                </Button>
              </td>
              <td>{event.name}</td>
              <td>{event.uid}</td>
            </tr>
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
    </div>
  );
}

export default ManageEvents;
