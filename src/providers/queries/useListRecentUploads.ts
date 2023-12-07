import { useQuery } from 'react-query';
import { listRecentUploads } from '@shared-data';

interface QueryProps {
  userUid?: string;
  count?: number;
}

export const useListRecentUploads = ({ userUid, count }: QueryProps) =>
  useQuery({
    queryKey: ['listRecentUploads', userUid, count],
    queryFn: () => listRecentUploads({ userUid, count }),
  });
