import { FormControl, FormLabel, Option, Select, Typography } from '@mui/joy';
import {
  useListEvents,
  useTeamLeaderboard,
  useUserLeaderboard,
} from '../../providers/queries';
import {
  EventLeaderboard,
  LoadingWrapper,
  TeamLeaderboard,
} from '../../components';
import React, { useEffect, useState } from 'react';
import { DIVISIONS, EventWithMetadata } from '@shared-data';
import { useSearchParams } from 'react-router-dom';
import ContentBox from '../../components/contentBox';
import Box from '@mui/joy/Box';

export default () => {
  const { data: events, isLoading } = useListEvents();

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedEvent, setSelectedEvent] = useState<EventWithMetadata | null>(
    null
  );

  const { data: teams } = useTeamLeaderboard(
    selectedEvent ? selectedEvent.uid : null
  );
  const { data: entries } = useUserLeaderboard(selectedEvent);

  useEffect(() => {
    if (!events || !events.length) return;

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
    <ContentBox maxWidth={700}>
      <Typography level={'h2'} mb={2}>
        Leaderboard
      </Typography>

      <LoadingWrapper loading={isLoading}>
        {events && events.length === 0 && (
          <Typography level={'body-md'}>
            No events yet! Check back later.
          </Typography>
        )}
        {events && selectedEvent && (
          <>
            <FormControl
              sx={{
                width: '50%',
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <FormLabel sx={{ mb: 0 }}>Select Event</FormLabel>
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
              <FormLabel sx={{ mb: 0 }}>Select Division</FormLabel>
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

            <Box sx={{ maxWidth: '700px', mt: 1, width: '100%' }}>
              {searchParams.get('division') === 'teams' ? (
                <TeamLeaderboard teams={teams} entries={entries} />
              ) : (
                <EventLeaderboard
                  entries={entries}
                  division={searchParams.get('division')}
                />
              )}
            </Box>
          </>
        )}
      </LoadingWrapper>
    </ContentBox>
  );
};
