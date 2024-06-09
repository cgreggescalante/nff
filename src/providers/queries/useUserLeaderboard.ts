import {
  Entry,
  EventWithMetadata,
  getUserLeaderboard,
  WithMetaData,
} from '@shared-data';
import { useQuery } from '@tanstack/react-query';
import { promiseWithTimeout } from './all.helpers';

export const useUserLeaderboard = (event: EventWithMetadata | null) =>
  useQuery({
    queryKey: ['userLeaderboard', event ? event.uid : ''],
    queryFn: () =>
      promiseWithTimeout(
        event
          ? getUserLeaderboard(event)
          : (new Promise(() => []) as Promise<
              (Entry & WithMetaData<Entry> & { rank: number })[]
            >),
        5000
      ),
    staleTime: 120000,
  });
