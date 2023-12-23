import { EventWithMetadata } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { useUserLeaderboard } from '../../../providers/queries/useUserLeaderboard';
import { Table } from '@mui/joy';

interface EventLeaderboardProps {
  event: EventWithMetadata;
}

export const EventLeaderboard = ({ event }: EventLeaderboardProps) => {
  const { data: leaderboard, isLoading } = useUserLeaderboard(event);

  return (
    <LoadingWrapper loading={isLoading}>
      {leaderboard && leaderboard.length > 0 && (
        <Table hoverRow={true}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>#</th>
              <th style={{ width: '40%' }}>User</th>
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
                    (item.entry.duration.Run ? item.entry.duration.Run : 0) * 10
                  ) / 10}
                </td>
                <td>
                  {Math.round(
                    (item.entry.duration.Ski ? item.entry.duration.Ski : 0) * 10
                  ) / 10}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </LoadingWrapper>
  );
};
