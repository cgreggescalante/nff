import { useQuery } from 'react-query';
import { listEvents } from '@shared-data';
import { promiseWithTimeout } from './all.helpers';

export const useListEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: () => promiseWithTimeout(listEvents(), 5000),
  });
