import { useEffect, useState } from 'react';
import { Entry, EventService, UserInfo } from '@shared-data';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import { Table } from 'react-bootstrap';

interface EventLeaderboardProps {
  eventUid: string;
}

export const EventLeaderboard = ({ eventUid }: EventLeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<
    { user: UserInfo; entry: Entry }[]
  >([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(true);

  useEffect(() => {
    EventService.getLeaderboard(eventUid).then((leaderboard) => {
      setLeaderboard(leaderboard);
      setLeaderboardLoading(false);
    });
  }, [eventUid]);

  return (
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
                      (item.entry.duration.Run ? item.entry.duration.Run : 0) *
                        10
                    ) / 10}
                  </td>
                  <td>
                    {Math.round(
                      (item.entry.duration.Ski ? item.entry.duration.Ski : 0) *
                        10
                    ) / 10}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </LoadingWrapper>
  );
};
