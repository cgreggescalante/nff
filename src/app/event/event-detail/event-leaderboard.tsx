import { useEffect, useState } from 'react';
import {
  Entry,
  EventWithUid,
  getUserLeaderboard,
  UserInfo,
} from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { Table } from 'react-bootstrap';

interface EventLeaderboardProps {
  event: EventWithUid;
}

export const EventLeaderboard = ({ event }: EventLeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<
    { user: UserInfo; entry: Entry }[]
  >([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserLeaderboard(event).then((leaderboard) => {
      setLeaderboard(leaderboard);
      setLeaderboardLoading(false);
    });
  }, [event]);

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
                    {item.user.firstName} {item.user.lastName}
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
