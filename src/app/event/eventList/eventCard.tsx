import { Card, Stack, Typography } from '@mui/joy';
import { Event } from '@mui/icons-material';
import { EventWithMetadata } from '@shared-data';
import { Link as RouterLink } from 'react-router-dom';

export interface EventCardProps {
  event: EventWithMetadata;
}

export default ({ event }: EventCardProps) => (
  <Card
    component={(props) => (
      <RouterLink
        {...props}
        to={`${event.uid}`}
        style={{ textDecoration: 'none' }}
      />
    )}
  >
    <Typography level={'h3'}>{event.name}</Typography>

    <Typography level={'body-md'}>{event.description}</Typography>

    <Stack direction={'row'} spacing={1}>
      <Event />
      <Typography level={'body-md'}>
        {event.startDate.toLocaleDateString()} to{' '}
        {event.endDate.toLocaleDateString()}
      </Typography>
    </Stack>

    <Typography level={'body-md'}>
      {event.registrationStart > new Date()
        ? `Registration opens ${event.registrationStart.toLocaleDateString()}`
        : event.registrationEnd <= new Date()
        ? 'Registration closed'
        : `Registration closes ${event.registrationEnd.toLocaleDateString()}`}
    </Typography>

    <Typography level={'body-md'}>
      {event.entryRefs.length} people have joined
    </Typography>
  </Card>
);
