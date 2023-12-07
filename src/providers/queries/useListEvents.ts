import { useQuery } from 'react-query';
import { listEvents } from '@shared-data';

export const useListEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: listEvents,
  });
