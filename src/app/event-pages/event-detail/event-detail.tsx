import styles from './event-detail.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Event, EventService } from '@shared-data';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import { useUser } from '../../../userContext';
import { Button } from 'react-bootstrap';

export function EventDetail() {
  const location = useLocation();
  const { eventId } = useParams();
  const { user } = useUser();
  const [event, setEvent] = useState<Event>(location.state as Event);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!event && eventId) {
      EventService.read(eventId)
        .then((event) => {
          if (event != null) {
            setEvent(event);
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

  return (
    <div className={styles['container']}>
      <LoadingWrapper loading={loading}>
        {event ? (
          <>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <p>{event.registeredUsers.length} Registered Users</p>

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
        ) : null}
      </LoadingWrapper>

      {error && <p>{error}</p>}
    </div>
  );
}

export default EventDetail;
