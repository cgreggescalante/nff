import {
  DIVISIONS,
  isUserRegisteredForEvent,
  registerUserForEvent,
} from '@shared-data';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Radio, RadioGroup, Typography } from '@mui/joy';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvent } from '../../providers/queries';
import ContentBox from '../../components/contentBox';
import { useAuth } from 'common-react';

export default () => {
  const { eventId } = useParams();
  const { user } = useAuth();

  if (!eventId) throw new Error('Event ID not provided');

  const { data: event } = useEvent(eventId);

  const navigate = useNavigate();

  const [goal, setGoal] = useState<number>(0);
  const [division, setDivision] = useState<string>('');

  const register = () => {
    if (goal <= 0 || division === '' || !event || !user) return;

    registerUserForEvent(event, user, goal, division)
      .then(() => navigate(`/events/${event.uid}`))
      .catch(() => {
        toast.error('Could not register for event');
      });
  };

  useEffect(() => {
    if (!eventId || !user) return;

    isUserRegisteredForEvent(user?.uid || '', eventId).then((isRegistered) => {
      if (isRegistered) {
        toast.error('You are already registered for this event', {
          toastId: 'already-registered',
        });
        navigate(`/events/${eventId}`);
      }
    });
  }, [user, eventId]);

  return (
    <ContentBox maxWidth={500}>
      <Typography level={'h2'}>Register for Event</Typography>
      <Typography level={'body-lg'} sx={{ mt: 2, mb: 1 }}>
        Please set a realistic goal.
      </Typography>
      <Input
        sx={{ ml: 1 }}
        slotProps={{ input: { min: 0 } }}
        autoFocus
        required
        type={'number'}
        value={goal}
        onChange={(e) =>
          setGoal(e.target.value ? parseFloat(e.target.value) : 0)
        }
      />
      <Typography level={'body-lg'} sx={{ mt: 2, mb: 1 }}>
        Select the division that best describes you.
      </Typography>
      <RadioGroup sx={{ ml: 1 }}>
        {DIVISIONS.map((cat) => (
          <Radio
            key={cat.value}
            value={cat.value}
            label={cat.value}
            checked={division === cat.value}
            onChange={() => setDivision(cat.value)}
          />
        ))}
      </RadioGroup>
      <Button onClick={register} sx={{ mt: 2 }}>
        Register
      </Button>
      <Button
        onClick={() => navigate(`/events/${eventId}`)}
        sx={{ mt: 2, ml: 1 }}
        variant={'plain'}
      >
        Cancel
      </Button>
    </ContentBox>
  );
};
