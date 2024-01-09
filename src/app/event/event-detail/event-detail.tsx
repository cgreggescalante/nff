import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, CheckIsEventOwner, registerUserForEvent } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { EventLeaderboard } from './event-leaderboard';
import { TeamLeaderboard } from './team-leaderboard';
import useAuth from '../../../providers/useAuth';
import { useEvent } from '../../../providers/queries';
import { Typography, Button } from '@mui/joy';

export const EventDetail = () => {
  const { eventId } = useParams();

  if (!eventId) throw new Error('Event ID not provided');

  const authData = useAuth();

  const { data: event, isLoading } = useEvent(eventId);

  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (authData.isAdmin) setCanEdit(true);
    else if (eventId && authData.userId) {
      CheckIsEventOwner(authData.userId, eventId)
        .then((isOwner) => {
          setCanEdit(isOwner);
        })
        .catch((error) => {
          console.error('Error while checking if user is event owner:', error);
        });
    } else {
      setCanEdit(false);
    }
  }, [authData, eventId]);

  return (
    <LoadingWrapper loading={isLoading}>
      {event && (
        <>
          <Typography level={'h2'}>{event.name}</Typography>
          <Link to={`/events/${eventId}/edit`} hidden={!canEdit}>
            <Button>Edit</Button>
          </Link>
          <Typography level={'body-md'}>{event.description}</Typography>
          <Typography level={'body-md'}>
            {event.entryRefs.length} Registered Users
          </Typography>
          {event.registrationStart > new Date() ? (
            <>Registration opens {event.registrationStart.toDateString()} </>
          ) : event.registrationEnd > new Date() ? (
            <>
              {auth.currentUser !== null ? (
                event.entryRefs.some((entryRef) =>
                  entryRef.path.startsWith(`users/${auth.currentUser?.uid}`)
                ) ? (
                  <p>You have already registered for this event</p>
                ) : (
                  <Button
                    onClick={() =>
                      registerUserForEvent(event, auth.currentUser!.uid)
                    }
                  >
                    Register Now
                  </Button>
                )
              ) : (
                <p>Please login to register</p>
              )}
              Registration ends {event.registrationEnd.toDateString()}
            </>
          ) : (
            <>Registration is closed for this event</>
          )}
          <EventLeaderboard event={event} />
          <TeamLeaderboard event={event} />
        </>
      )}
    </LoadingWrapper>
  );
};

export default EventDetail;
