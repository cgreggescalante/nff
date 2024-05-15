import { EventWithMetadata } from '@shared-data';
import { useUserLeaderboard } from '../../../providers/queries';
import { Table } from '@mui/joy';
import { LoadingWrapper } from '../../../components';

interface EventLeaderboardProps {
  event: EventWithMetadata;
}

export const EventLeaderboard = ({ event }: EventLeaderboardProps) => {
  const { data: leaderboard, isLoading } = useUserLeaderboard(event);

  return (
    <LoadingWrapper loading={isLoading}>
      {leaderboard && leaderboard.length > 0 && (
        <Table hoverRow={true} borderAxis={'bothBetween'}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '35%' }}>User</th>
              <th>% Goal</th>
              <th>Goal</th>
              <th>Points</th>
              <th>Run</th>
              <th>Ski</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.userDisplayName}</td>
                <td>{Math.round((entry.points / entry.goal) * 10000) / 100}</td>
                <td>{entry.goal}</td>
                <td>{Math.round(entry.points * 10) / 10}</td>
                <td>
                  {Math.round(
                    (entry.activities.Run ? entry.activities.Run : 0) * 10
                  ) / 10}
                </td>
                <td>
                  {Math.round(
                    ((entry.activities['Classic Roller Skiing'] || 0) +
                      (entry.activities['Skate Roller Skiing'] || 0)) *
                      10
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
