import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, CheckIsEventOwner, EventWithMetadata } from '@shared-data';
import EventLeaderboard from './eventLeaderboard';
import TeamLeaderboard from './teamLeaderboard';
import useAuth from '../../../providers/useAuth';
import { Button, Typography } from '@mui/joy';
import useEventRoute, {
  EventRouteProvider,
} from '../../../providers/useEventRoute';

export default () => (
  <EventRouteProvider>
    <EventDetail />
  </EventRouteProvider>
);

const EventDetail = () => {
  const event = useEventRoute();

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
    <>
      <Typography level={'h2'}>{event.name}</Typography>
      <Link to={`/events/${event.uid}/edit`} hidden={!canEdit}>
        <Button>Edit</Button>
      </Link>
      <Link to={`/events/${event.uid}/draft`} hidden={!canEdit}>
        <Button sx={{ ml: 1 }}>Start Draft</Button>
      </Link>
      <Typography level={'body-md'}>{event.description}</Typography>
      <Typography level={'body-md'}>
        {event.entryRefs.length} Registered Users
      </Typography>
      <RegisterButton event={event} />
      <EventLeaderboard event={event} />
      <TeamLeaderboard event={event} />
    </>
  );
};

const RegisterButton = ({ event }: { event: EventWithMetadata }) => {
  const navigate = useNavigate();

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

  if (auth.currentUser === null)
    return <Typography level={'body-md'}>Please login to register</Typography>;

  if (
    event.entryRefs.some((entryRef) =>
      entryRef.path.endsWith(`users/${auth.currentUser?.uid}`)
    )
  )
    return (
      <Typography level={'body-md'}>
        You are already registered for this event
      </Typography>
    );

  return <Button onClick={() => navigate('./register')}>Register</Button>;
};
