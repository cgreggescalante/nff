import {
  Select,
  Typography,
  Option,
  FormLabel,
  FormControl,
  Stack,
} from '@mui/joy';
import Box from '@mui/joy/Box';
import { useListEvents } from '../../providers/queries';
import { LoadingWrapper } from '../../components';
import React, { useEffect, useState } from 'react';
import { DIVISIONS, EventWithMetadata } from '@shared-data';
import EventLeaderboard from '../eventDetail/eventLeaderboard';
import TeamLeaderboard from '../eventDetail/teamLeaderboard';
import { useSearchParams } from 'react-router-dom';

export default () => {
  const { data: events, isLoading } = useListEvents();

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedEvent, setSelectedEvent] = useState<EventWithMetadata | null>(
    null
  );

  useEffect(() => {
    if (!events) return;

    const eventId = searchParams.get('eventId') || events[0].uid;

    if (eventId)
      setSelectedEvent(
        events.find((event) => event.uid === eventId) || events[0]
      );
    else {
      setSelectedEvent(events[0]);
    }
  }, [searchParams, events, isLoading]);

  const handleEventChange = (newEvent: EventWithMetadata | null) => {
    if (!newEvent) return;
    setSearchParams({
      eventId: newEvent.uid,
      division: searchParams.get('division') || '',
    });
    setSelectedEvent(newEvent);
  };

  const handleDivisionChange = (newDivision: string) => {
    setSearchParams({
      eventId: selectedEvent ? selectedEvent.uid : '',
      division: newDivision,
    });
  };

  return (
    <Box>
      <Typography level={'h2'}>Leaderboard</Typography>

      <LoadingWrapper loading={isLoading}>
        {events && selectedEvent && (
          <>
            <Stack
              direction={'row'}
              spacing={1}
              sx={{
                width: '100%',
              }}
            >
              <FormControl
                sx={{
                  width: '50%',
                  flexGrow: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <FormLabel>Select Event</FormLabel>
                <Select
                  value={selectedEvent}
                  onChange={(_, value) => handleEventChange(value)}
                >
                  {events.map((event, index) => (
                    <Option key={index} value={event}>
                      {event.name}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  width: '50%',
                  flexGrow: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <FormLabel>Select Division</FormLabel>
                <Select
                  value={searchParams.get('division')}
                  onChange={(_, value) => handleDivisionChange(value || '')}
                >
                  <Option key={''} value={''}>
                    All
                  </Option>
                  <Option key={'teams'} value={'teams'}>
                    Teams
                  </Option>
                  {DIVISIONS.map(({ value }) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Box marginTop={1}>
              {searchParams.get('division') === 'teams' ? (
                <TeamLeaderboard event={selectedEvent} />
              ) : (
                <EventLeaderboard
                  event={selectedEvent}
                  division={searchParams.get('division')}
                />
              )}
            </Box>
          </>
        )}
      </LoadingWrapper>
    </Box>
  );
};
