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
import { useEffect, useState } from 'react';
import { DIVISIONS } from '@shared-data';

export default () => {
  const { data: events, isLoading } = useListEvents();

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>('');

  useEffect(() => {
    if (!events) return;

    setSelectedEvent(events[0].uid);
  }, [events, isLoading]);

  return (
    <Box>
      <Typography level={'h2'}>Leaderboard</Typography>

      <LoadingWrapper loading={isLoading}>
        {events && (
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
                  onChange={(_, value) => setSelectedEvent(value)}
                >
                  {events.map((event, index) => (
                    <Option key={index} value={event.uid}>
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
                  value={selectedDivision}
                  onChange={(_, value) => setSelectedDivision(value)}
                >
                  <Option key={''} value={''}>
                    All
                  </Option>
                  {DIVISIONS.map(({ value }) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </>
        )}
      </LoadingWrapper>
    </Box>
  );
};
