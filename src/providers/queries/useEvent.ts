import { promiseWithTimeout } from './all.helpers';
import { useQuery } from 'react-query';
import { readEvent } from '@shared-data';

export const useEvent = (id: string) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => promiseWithTimeout(readEvent(id), 5000),
  });
