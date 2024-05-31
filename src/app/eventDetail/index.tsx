import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  auth,
  CheckIsEventOwner,
  EntryWithMetaData,
  EventWithMetadata,
} from '@shared-data';
import useAuth from '../../providers/useAuth';
import { Button, Stack, Typography } from '@mui/joy';
import useEventRoute, {
  EventRouteProvider,
} from '../../providers/useEventRoute';
import { EventLeaderboard, TeamLeaderboard } from '../../components';
import ContentBox from '../../components/contentBox';
import {
  useTeamLeaderboard,
  useUserLeaderboard,
} from '../../providers/queries';

export default () => (
  <EventRouteProvider>
    <EventDetail />
  </EventRouteProvider>
);

const EventDetail = () => {
  const event = useEventRoute();

  const { data: teams } = useTeamLeaderboard(event.uid);
  const { data: entries } = useUserLeaderboard(event);

  const { isAdmin, user } = useAuth();
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (isAdmin) setCanEdit(true);
    else if (user && event && user.uid) {
      CheckIsEventOwner(user.uid, event.uid)
        .then((isOwner) => {
          setCanEdit(isOwner);
        })
        .catch((error) => {
          console.error('Error while checking if user is event owner:', error);
        });
    } else {
      setCanEdit(false);
    }
  }, [user, isAdmin, event]);

  return (
    <ContentBox maxWidth={800}>
      <Stack spacing={1}>
        <Typography level={'h2'}>{event.name}</Typography>

        <Stack direction={'row'}>
          <Link to={`/events/${event.uid}/edit`} hidden={!canEdit}>
            <Button>Edit</Button>
          </Link>
          <Link to={`/events/${event.uid}/draft`} hidden={!canEdit}>
            <Button sx={{ ml: 1 }}>Start Draft</Button>
          </Link>
        </Stack>

        <Typography level={'body-md'}>{event.description}</Typography>
        <Typography level={'body-md'}>
          {event.entryRefs.length} Registered Users
        </Typography>

        <RegisterButton event={event} entries={entries} />

        <TeamLeaderboard teams={teams} entries={entries} />
        <EventLeaderboard entries={entries} />
      </Stack>
    </ContentBox>
  );
};

const RegisterButton = ({
  event,
  entries,
}: {
  event: EventWithMetadata;
  entries: EntryWithMetaData[] | undefined;
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (entries?.some((entry) => entry.userId === user?.uid))
    return (
      <Typography level={'body-md'}>
        You are already registered for this event
      </Typography>
    );

  if (event.registrationStart > new Date())
    return (
      <Typography level={'body-md'}>
        Registration opens {event.registrationStart.toDateString()}
      </Typography>
    );

  if (event.registrationEnd < new Date())
    return (
      <Typography level={'body-md'}>
        Registration is closed for this event
      </Typography>
    );

  return (
    <Button sx={{ maxWidth: '100px' }} onClick={() => navigate('./register')}>
      Register
    </Button>
  );
};
