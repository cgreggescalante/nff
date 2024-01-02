import { useQuery } from 'react-query';
import { promiseWithTimeout } from './all.helpers';
import { getTeamLeaderboard } from '@shared-data';

export const useTeamLeaderboard = (id: string) =>
  useQuery({
    queryKey: ['teamLeaderboard', id],
    queryFn: () => promiseWithTimeout(getTeamLeaderboard(id), 5000),
    staleTime: 120000,
  });
