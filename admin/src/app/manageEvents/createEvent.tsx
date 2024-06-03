import { FormEvent, useState } from 'react';
import { createEvent } from '@shared-data';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy';

export interface CreateEventProps {
  completed: () => void;
}

export default ({ completed }: CreateEventProps) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [registrationStart, setRegistrationStart] = useState<string>('');
  const [registrationEnd, setRegistrationEnd] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newEvent = {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      registrationStart: new Date(registrationStart),
      registrationEnd: new Date(registrationEnd),
      entryRefs: [],
      useGoals: true,
    };

    createEvent(newEvent)
      .then(() => completed())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Typography level={'h2'}>Add Event</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Name</FormLabel>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ mt: 1 }}>
          <FormLabel>Description</FormLabel>
          <Textarea
            minRows={2}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Stack direction={'row'} spacing={2} sx={{ mt: 1 }}>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              type={'date'}
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input
              type={'date'}
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>
        </Stack>

        <Stack direction={'row'} spacing={2} sx={{ mt: 1 }}>
          <FormControl>
            <FormLabel>Registration Start</FormLabel>
            <Input
              type={'date'}
              required
              value={registrationStart}
              onChange={(e) => setRegistrationStart(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Registration End</FormLabel>
            <Input
              type={'date'}
              required
              value={registrationEnd}
              onChange={(e) => setRegistrationEnd(e.target.value)}
            />
          </FormControl>
        </Stack>

        <Typography level={'h3'} sx={{ mt: 2 }}>
          Scoring Rates
        </Typography>

        <Button type={'submit'} sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </div>
  );
};
