import { useQuery } from '@tanstack/react-query';
import { promiseWithTimeout } from './all.helpers';
import { getTeamLeaderboard, Team, WithMetaData } from '@shared-data';

export const useTeamLeaderboard = (id: string | null) =>
  useQuery({
    queryKey: ['teamLeaderboard', id],
    queryFn: () =>
      promiseWithTimeout(
        id
          ? getTeamLeaderboard(id)
          : (new Promise(() => []) as Promise<
              (Team & WithMetaData<Team> & { rank: number })[]
            >),
        5000
      ),
    staleTime: 120000,
  });
