import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, CheckIsEventOwner, EventWithMetadata } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { EventLeaderboard } from './event-leaderboard';
import { TeamLeaderboard } from './team-leaderboard';
import useAuth from '../../../providers/useAuth';
import { useEvent } from '../../../providers/queries';
import { Button, Typography } from '@mui/joy';

export const EventDetail = () => {
  const { eventId } = useParams();

  if (!eventId) throw new Error('Event ID not provided');

  const { isAdmin, user } = useAuth();

  const { data: event, isLoading } = useEvent(eventId);

  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (isAdmin) setCanEdit(true);
    else if (user && eventId && user.uid) {
      CheckIsEventOwner(user.uid, eventId)
        .then((isOwner) => {
          setCanEdit(isOwner);
        })
        .catch((error) => {
          console.error('Error while checking if user is event owner:', error);
        });
    } else {
      setCanEdit(false);
    }
  }, [user, isAdmin, eventId]);

  return (
    <LoadingWrapper loading={isLoading}>
      {event && (
        <>
          <Typography level={'h2'}>{event.name}</Typography>
          <Link to={`/events/${eventId}/edit`} hidden={!canEdit}>
            <Button>Edit</Button>
          </Link>
          <Link to={`/events/${eventId}/draft`} hidden={!canEdit}>
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
      )}
    </LoadingWrapper>
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

export default EventDetail;
