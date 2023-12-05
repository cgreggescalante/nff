import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  CheckIsEventOwner,
  EventWithUid,
  readEvent,
  registerUserForEvent,
} from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { Button } from 'react-bootstrap';
import { EventLeaderboard } from './event-leaderboard';
import { TeamLeaderboard } from './team-leaderboard';
import useAuth from '../../../providers/useAuth';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';

export const EventDetail = () => {
  const { eventId } = useParams();
  const authData = useAuth();

  const [event, setEvent] = useState<EventWithUid>();
  const [loading, setLoading] = useState<boolean>(true);

  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!event && eventId) {
      readEvent(eventId)
        .then((event) => {
          if (event != null) {
            setEvent(event);
            document.title = event.name;
          } else
            toast.error('Could not find event', { toastId: 'event-detail' });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error while fetching event:', error);
        });
    } else {
      setLoading(false);
    }
  }, [event, eventId]);

  useEffect(() => {
    if (authData.isAdmin) setCanEdit(true);
    else if (eventId) {
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
    <LoadingWrapper loading={loading}>
      {event && (
        <>
          <h1>{event.name}</h1>{' '}
          <Link to={`/events/${eventId}/edit`} hidden={!canEdit}>
            <Button>Edit</Button>
          </Link>
          <p>{event.description}</p>
          <p>{event.entryRefs.length} Registered Users</p>
          {event.registrationStart > new Date() ? (
            <>Registration opens {event.registrationStart.toDateString()} </>
          ) : event.registrationEnd > new Date() ? (
            <>
              {auth.currentUser !== null ? (
                <Button
                  onClick={() =>
                    registerUserForEvent(event, auth.currentUser!.uid)
                  }
                >
                  Register Now
                </Button>
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
