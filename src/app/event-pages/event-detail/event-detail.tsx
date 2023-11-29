import styles from './event-detail.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Entry,
  Event,
  EventService,
  Team,
  UserInfo,
  WorkoutTypeToNumber,
} from '@shared-data';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import { useUser } from '../../../userContext';
import { Button, Table } from 'react-bootstrap';

export const EventDetail = () => {
  const location = useLocation();
  const { eventId } = useParams();
  const { user } = useUser();
  const [event, setEvent] = useState<Event>(location.state as Event);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const [leaderboard, setLeaderboard] = useState<
    { user: UserInfo; entry: Entry }[]
  >([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(true);

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState<boolean>(true);

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

      EventService.getTeams(eventId).then((event) => {
        console.log(event);
        setTeams(event.teams);
        setTeamsLoading(false);
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

      <LoadingWrapper loading={leaderboardLoading}>
        {leaderboard.length > 0 && (
          <>
            <h2>Leaderboard</h2>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Points</th>
                  <th>Run</th>
                  <th>Ski</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {item.user.name.firstName} {item.user.name.lastName}
                    </td>
                    <td>{Math.round(item.entry.points * 10) / 10}</td>
                    <td>
                      {Math.round(
                        (item.entry.duration.Run
                          ? item.entry.duration.Run
                          : 0) * 10
                      ) / 10}
                    </td>
                    <td>
                      {Math.round(
                        (item.entry.duration.Ski
                          ? item.entry.duration.Ski
                          : 0) * 10
                      ) / 10}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </LoadingWrapper>

      <LoadingWrapper loading={teamsLoading}>
        {teams.length > 0 && (
          <>
            <h2>Teams</h2>
            <ul>
              {teams.map((team, index) => (
                <li key={index}>
                  <h3>{team.name}</h3>
                </li>
              ))}
            </ul>
          </>
        )}
      </LoadingWrapper>

      {error && <p>{error}</p>}
    </div>
  );
};

export default EventDetail;
