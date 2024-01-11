import { useParams } from 'react-router-dom';
import { FormControl, FormLabel, Grid, Input, Typography } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { EditTeams } from './edit-event/edit-teams';
import { useEvent } from '../../../providers/queries';
import { useEffect, useState } from 'react';
import { EventWithMetadata } from '@shared-data';

export const EditEvent = () => {
  const { eventId } = useParams();

  const { data: serverEvent, isLoading } = useEvent(eventId ? eventId : '');
  const [event, setEvent] = useState<EventWithMetadata>();

  useEffect(() => {
    if (serverEvent) setEvent(serverEvent);
  }, [serverEvent]);

  if (isLoading) return <p>Loading...</p>;
  if (!event) return <p>No event found with id {eventId}</p>;

  document.title = event.name;

  return (
    event && (
      <>
        <Grid container spacing={2} style={{ maxWidth: '600px' }}>
          <Grid xs={12}>
            <Typography level={'h2'}>Edit Event</Typography>
          </Grid>

          <Grid xs={12}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
              />
            </FormControl>
          </Grid>

          <Grid>
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
          </Grid>
          <Grid>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <DatePicker
                value={dayjs(event.endDate)}
                onChange={(value) =>
                  value ? setEvent({ ...event, endDate: value.toDate() }) : null
                }
              />
            </FormControl>
          </Grid>

          <Grid>
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
          </Grid>
          <Grid>
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
          </Grid>
        </Grid>

        <EditTeams event={event} />
      </>
    )
  );
};
