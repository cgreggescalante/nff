import { EventWithMetadata, getUserLeaderboard } from '@shared-data';
import { useQuery } from 'react-query';
import { promiseWithTimeout } from './all.helpers';

export const useUserLeaderboard = (event: EventWithMetadata) =>
  useQuery({
    queryKey: ['userLeaderboard', event.uid],
    queryFn: () => promiseWithTimeout(getUserLeaderboard(event), 5000),
  });
