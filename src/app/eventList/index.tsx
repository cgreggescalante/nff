import EventCard from './eventCard';
import { useListEvents } from '../../providers/queries';
import { Stack, Typography } from '@mui/joy';
import { LoadingWrapper } from '../../components';
import ContentBox from '../../components/contentBox';

export default () => {
  const { data: events, isLoading } = useListEvents();

  return (
    <ContentBox maxWidth={600}>
      <LoadingWrapper loading={isLoading}>
        <Stack spacing={2}>
          <Typography level={'h2'}>Events</Typography>
          {events?.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </Stack>
      </LoadingWrapper>
    </ContentBox>
  );
};
