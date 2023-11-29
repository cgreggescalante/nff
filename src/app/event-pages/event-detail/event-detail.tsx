import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckIsEventOwner, Event, EventService } from '@shared-data';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import { useUser } from '../../../userContext';
import { Button } from 'react-bootstrap';
import { EventLeaderboard } from './event-leaderboard';
import { TeamsList } from './teams-list';
import useAuth from '../../../useAuth';

export const EventDetail = () => {
  const location = useLocation();
  const { eventId } = useParams();
  const authData = useAuth();
  const { user } = useUser();
  const [event, setEvent] = useState<Event>(location.state as Event);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!event && eventId) {
      EventService.read(eventId)
        .then((event) => {
          if (event != null) {
            setEvent(event);
            document.title = event.name;
          } else setError('No event found with the given ID');
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
    if (authData.user) {
      if (authData.isAdmin) {
        setCanEdit(true);
      } else if (eventId) {
        CheckIsEventOwner(authData.user.uid, eventId)
          .then((isOwner) => {
            setCanEdit(isOwner);
          })
          .catch((error) => {
            console.error(
              'Error while checking if user is event owner:',
              error
            );
          });
      }
    } else setCanEdit(false);
  }, [authData, eventId]);

  return (
    <>
      <LoadingWrapper loading={loading}>
        {event && (
          <>
            <h1>{event.name}</h1>{' '}
            <Link to={`/events/${eventId}/edit`} hidden={!canEdit}>
              <Button>Edit</Button>
            </Link>
            <p>{event.description}</p>
            <p>{event.registeredUserRefs.length} Registered Users</p>
            {event.registrationStart > new Date() ? (
              <>Registration opens {event.registrationStart.toDateString()} </>
            ) : event.registrationEnd > new Date() ? (
              <>
                {user ? (
                  <Button>Register Now</Button>
                ) : (
                  <p>Please login to register</p>
                )}
                Registration ends {event.registrationEnd.toDateString()}
              </>
            ) : (
              <>Registration is closed for this event</>
            )}
          </>
        )}
      </LoadingWrapper>

      {eventId && <EventLeaderboard eventUid={eventId} />}

      {eventId && <TeamsList eventUid={eventId} />}

      {error && <p>{error}</p>}
    </>
  );
};

export default EventDetail;
