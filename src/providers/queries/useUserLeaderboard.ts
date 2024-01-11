import { EventWithMetadata, getUserLeaderboard } from '@shared-data';
import { useQuery } from '@tanstack/react-query';
import { promiseWithTimeout } from './all.helpers';

export const useUserLeaderboard = (event: EventWithMetadata) =>
  useQuery({
    queryKey: ['userLeaderboard', event.uid],
    queryFn: () => promiseWithTimeout(getUserLeaderboard(event), 5000),
    staleTime: 120000,
  });
