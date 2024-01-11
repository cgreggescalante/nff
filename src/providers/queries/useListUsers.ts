import { useQuery } from '@tanstack/react-query';
import { listUsers } from '@shared-data';
import { promiseWithTimeout } from './all.helpers';

export const useListUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => promiseWithTimeout(listUsers(), 5000),
    staleTime: 120000,
  });
