import { auth, registerUserForEvent } from '@shared-data';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Radio, RadioGroup, Typography } from '@mui/joy';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvent } from '../../../providers/queries';

const CATEGORIES = [
  {
    value: 'Upperclassmen',
    label: 'students entering junior or senior year',
  },
  {
    value: 'Underclassmen',
    label: 'students entering freshman or sophomore year',
  },
  {
    value: 'Middle School',
    label: 'students entering grades 6 though 8',
  },
  { value: 'Staff & VIPs', label: 'coaches, teachers, and VIPs' },
  {
    value: 'Parents',
    label: 'parents of students (who are not staff)',
  },
  {
    value: 'Alumni',
    label: 'Highland alumni who do not fall into a category above',
  },
];

export default () => {
  const { eventId } = useParams();

  if (!eventId) throw new Error('Event ID not provided');

  const { data: event } = useEvent(eventId);

  const navigate = useNavigate();

  const [goal, setGoal] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const register = () => {
    if (goal <= 0 || category === '' || !event) return;

    registerUserForEvent(event, auth.currentUser!, goal)
      .then(() => navigate(`/events/${event.uid}`))
      .catch(() => {
        toast.error('Could not register for event');
      });
  };

  return (
    <>
      <Typography level={'h2'}>Register for Event</Typography>
      <Typography level={'body-lg'} sx={{ mt: 2, mb: 1 }}>
        Please set a realistic goal.
      </Typography>
      <Input
        sx={{ ml: 1 }}
        autoFocus
        required
        type={'number'}
        value={goal}
        onChange={(e) => setGoal(parseFloat(e.target.value))}
      />
      <Typography level={'body-lg'} sx={{ mt: 2, mb: 1 }}>
        Select the category that best describes you.
      </Typography>
      <RadioGroup sx={{ ml: 1 }}>
        {CATEGORIES.map((cat) => (
          <Radio
            key={cat.value}
            value={cat.value}
            label={cat.value}
            checked={category === cat.value}
            onChange={() => setCategory(cat.value)}
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
    </>
  );
};
