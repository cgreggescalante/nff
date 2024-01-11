import { useQuery } from '@tanstack/react-query';
import { listRecentUploads } from '@shared-data';
import { promiseWithTimeout } from './all.helpers';

interface QueryProps {
  userUid?: string;
  count: number;
}

export const useListRecentUploads = ({ userUid, count }: QueryProps) =>
  useQuery({
    queryKey: ['listRecentUploads', userUid, count],
    queryFn: () =>
      promiseWithTimeout(listRecentUploads({ userUid, count }), 5000),
    retry: 10,
  });
