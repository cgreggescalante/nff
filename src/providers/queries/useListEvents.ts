import { useQuery } from '@tanstack/react-query';
import { listEvents } from '@shared-data';
import { promiseWithTimeout } from './all.helpers';

export const useListEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: () => promiseWithTimeout(listEvents(), 5000),
    staleTime: 120000,
  });
