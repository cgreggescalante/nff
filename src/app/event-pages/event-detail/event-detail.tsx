import styles from './event-detail.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Event,
  EventService,
  UserInfo,
  WorkoutTypeToNumber,
} from '@shared-data';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import { useUser } from '../../../userContext';
import { Button, Table } from 'react-bootstrap';

export function EventDetail() {
  const location = useLocation();
  const { eventId } = useParams();
  const { user } = useUser();
  const [event, setEvent] = useState<Event>(location.state as Event);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const [leaderboard, setLeaderboard] = useState<
    { user: UserInfo; points: WorkoutTypeToNumber }[]
  >([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(true);

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
    if (eventId) {
      EventService.getLeaderboard(eventId).then((leaderboard) => {
        setLeaderboard(leaderboard);
        setLeaderboardLoading(false);
      });
    }
  }, [eventId]);

  return (
    <div className={styles['container']}>
      <LoadingWrapper loading={loading}>
        {event && (
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
        )}
      </LoadingWrapper>

      <LoadingWrapper loading={leaderboardLoading}>
        {leaderboard.length > 0 && (
          <>
            <h2>Leaderboard</h2>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Run Duration</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {entry.user.name.firstName} {entry.user.name.lastName}
                    </td>
                    <td>{entry.points.Run}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </LoadingWrapper>

      {error && <p>{error}</p>}
    </div>
  );
}

export default EventDetail;
