import { EventWithMetadata } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { useTeamLeaderboard } from '../../../providers/queries/useTeamLeaderboard';

interface TeamsListProps {
  event: EventWithMetadata;
}

export const TeamLeaderboard = ({ event }: TeamsListProps) => {
  const { data: teams, isLoading } = useTeamLeaderboard(event.uid);

  return (
    <LoadingWrapper loading={isLoading}>
      {teams && teams.length > 0 && (
        <>
          <h2>Teams</h2>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>
                <h3>{team.name}</h3>
                <h5>{team.points}</h5>
              </li>
            ))}
          </ul>
        </>
      )}
    </LoadingWrapper>
  );
};
