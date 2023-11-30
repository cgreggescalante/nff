import { useEffect, useState } from 'react';
import { EventWithUid, Team, TeamService } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';

interface TeamsListProps {
  event: EventWithUid;
}

export const TeamLeaderboard = ({ event }: TeamsListProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState<boolean>(true);

  useEffect(() => {
    TeamService.getLeaderboard(event.uid).then((teams) => {
      setTeams(teams);
      setTeamsLoading(false);
    });
  }, [event]);

  return (
    <LoadingWrapper loading={teamsLoading}>
      {teams.length > 0 && (
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
