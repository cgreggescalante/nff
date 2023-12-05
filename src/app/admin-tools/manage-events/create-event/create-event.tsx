import { Button, Form, InputGroup } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import {
  createEvent,
  WorkoutType,
  WorkoutTypeNames,
  WorkoutTypeToNumber,
} from '@shared-data';
import { ManagedFormControl } from '@shared-ui';

export interface CreateEventProps {
  completed: () => void;
}

const defaultScoringConfiguration = () => {
  const obj = {} as { [key in WorkoutType]: number };
  WorkoutTypeNames.forEach((workoutType) => (obj[workoutType] = 1));
  return obj;
};

export const CreateEvent = ({ completed }: CreateEventProps) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [registrationStart, setRegistrationStart] = useState<string>('');
  const [registrationEnd, setRegistrationEnd] = useState<string>('');
  const [scoringConfiguration, setScoringConfiguration] =
    useState<WorkoutTypeToNumber>(defaultScoringConfiguration());

  const handleScoringConfiguration =
    (workoutType: WorkoutType) => (value: number) => {
      if (value < 0) return;
      setScoringConfiguration({
        ...scoringConfiguration,
        [workoutType]: value,
      });
    };

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
      scoringRules: WorkoutTypeNames.map((workoutType) => {
        let standardRate = 0;
        const value = scoringConfiguration[workoutType];
        if (value !== undefined) {
          standardRate = value;
        }

        return {
          workoutType,
          standardRate,
        };
      }),
    };

    createEvent(newEvent)
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

        <Form.Label>Scoring Rates</Form.Label>

        {WorkoutTypeNames.map((workoutType) => (
          <InputGroup key={workoutType}>
            <InputGroup.Text>{workoutType}</InputGroup.Text>
            <ManagedFormControl
              value={scoringConfiguration[workoutType]}
              setValue={handleScoringConfiguration(workoutType)}
              type={'number'}
            />
          </InputGroup>
        ))}

        <Button
          className={'mt-2'}
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
