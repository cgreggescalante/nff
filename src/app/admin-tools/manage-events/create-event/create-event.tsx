import { Button, Form, InputGroup } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import ManagedFormControl from './managed-form-control/managed-form-control';
import { EventService } from '@shared-data';

export interface CreateEventProps {
  completed: () => void;
}

export const CreateEvent = ({ completed }: CreateEventProps) => {
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
      registeredUsers: [],
    };

    EventService.create(newEvent)
      .then(() => completed())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Add Event</h3>
      <Form onSubmit={handleSubmit}>
        <InputGroup hasValidation className={'mb-2'}>
          <InputGroup.Text>Event Name</InputGroup.Text>
          <ManagedFormControl
            isInvalid={!name}
            value={name}
            setValue={setName}
            placeholder={'Event Name'}
          />
        </InputGroup>

        <InputGroup hasValidation className={'mb-2'}>
          <InputGroup.Text>Description</InputGroup.Text>
          <ManagedFormControl
            isInvalid={!description}
            value={description}
            setValue={setDescription}
            as="textarea"
            placeholder={'Description'}
          />
        </InputGroup>

        <InputGroup hasValidation className={'mb-2'}>
          <InputGroup.Text>Event Dates</InputGroup.Text>
          <ManagedFormControl
            isInvalid={!startDate}
            value={startDate}
            setValue={setStartDate}
            type={'date'}
          />
          <InputGroup.Text>to</InputGroup.Text>
          <ManagedFormControl
            isInvalid={!endDate}
            value={endDate}
            setValue={setEndDate}
            type={'date'}
          />
        </InputGroup>
        <InputGroup className={'mb-2'}>
          <InputGroup.Text>Registration Dates</InputGroup.Text>
          <ManagedFormControl
            isInvalid={!registrationStart}
            value={registrationStart}
            setValue={setRegistrationStart}
            type={'date'}
          />
          <InputGroup.Text>to</InputGroup.Text>
          <ManagedFormControl
            isInvalid={!registrationEnd}
            value={registrationEnd}
            setValue={setRegistrationEnd}
            type={'date'}
          />
        </InputGroup>

        <Button
          type={'submit'}
          active={
            !name ||
            !description ||
            !startDate ||
            !endDate ||
            !registrationStart ||
            !registrationEnd
          }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateEvent;
