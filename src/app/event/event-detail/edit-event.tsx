import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventWithMetadata, readEvent } from '@shared-data';
import { toast } from 'react-toastify';
import { FormControl, FormLabel, Input, Table, Typography } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { EditTeams } from './edit-event/edit-teams';

// TODO: event detail query
// TODO: add route protection to check if the user is an event owner
export const EditEvent = () => {
  const location = useLocation();
  const { eventId } = useParams();

  const [event, setEvent] = useState<EventWithMetadata>(
    location.state as EventWithMetadata
  );
  const [eventLoading, setEventLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!event && eventId)
      readEvent(eventId)
        .then((event) => {
          if (event != null) {
            setEvent(event);
            document.title = event.name;
          } else toast.error('Could not find event', { toastId: 'edit-event' });
          setEventLoading(false);
        })
        .catch((error) => {
          console.error('Error while fetching event:', error);
        });
    else setEventLoading(false);
  }, [event, eventId]);

  // TODO: Make the form prettier
  return (
    !eventLoading &&
    eventId &&
    event && (
      <>
        <Typography level={'h2'}>Edit Event</Typography>
        <Table borderAxis={'none'}>
          <thead>
            <tr>
              <th style={{ maxWidth: '10%', height: 0 }} />
              <th style={{ height: 0 }} />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={event.name}
                    onChange={(e) =>
                      setEvent({ ...event, name: e.target.value })
                    }
                  />
                </FormControl>
              </td>
            </tr>
            <tr>
              <td>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    value={event.description}
                    onChange={(e) =>
                      setEvent({ ...event, description: e.target.value })
                    }
                  />
                </FormControl>
              </td>
            </tr>
            <tr>
              <td>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <DatePicker
                    value={dayjs(event.startDate)}
                    onChange={(value) =>
                      value
                        ? setEvent({ ...event, startDate: value.toDate() })
                        : null
                    }
                  />
                </FormControl>
              </td>
              <td>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <DatePicker
                    value={dayjs(event.endDate)}
                    onChange={(value) =>
                      value
                        ? setEvent({ ...event, endDate: value.toDate() })
                        : null
                    }
                  />
                </FormControl>
              </td>
            </tr>
            <tr>
              <td>
                <FormControl>
                  <FormLabel>Registration Start</FormLabel>
                  <DatePicker
                    value={dayjs(event.registrationStart)}
                    onChange={(value) =>
                      value
                        ? setEvent({
                            ...event,
                            registrationStart: value.toDate(),
                          })
                        : null
                    }
                  />
                </FormControl>
              </td>
              <td>
                <FormControl>
                  <FormLabel>Registration End</FormLabel>
                  <DatePicker
                    value={dayjs(event.registrationEnd)}
                    onChange={(value) =>
                      value
                        ? setEvent({
                            ...event,
                            registrationEnd: value.toDate(),
                          })
                        : null
                    }
                  />
                </FormControl>
              </td>
            </tr>
          </tbody>
        </Table>
        <EditTeams event={event} />
      </>
    )
  );
};
