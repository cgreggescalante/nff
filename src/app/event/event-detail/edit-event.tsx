import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Event,
  EventService,
  Team,
  TeamService,
  TeamWithUid,
} from '@shared-data';
import { DocumentReference } from 'firebase/firestore';
import { Button, Card } from 'react-bootstrap';
import ManagedTextInput from '../../components/managed-inputs/managed-text-input';
import { ManagedDateInput } from '../../components/managed-inputs/managed-date-input';
import { LoadingWrapper, ConfirmPopup } from '@shared-ui';

// TODO: add route protection to check if the user is an event owner
export const EditEvent = () => {
  const location = useLocation();
  const { eventId } = useParams();

  const [event, setEvent] = useState<Event>(location.state as Event);
  const [eventLoading, setEventLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!event && eventId)
      EventService.read(eventId)
        .then((event) => {
          if (event != null) {
            setEvent(event);
            document.title = event.name;
          } else setError('No event found with the given ID');
          setEventLoading(false);
        })
        .catch((error) => {
          console.error('Error while fetching event:', error);
        });
    else setEventLoading(false);
  }, [event, eventId]);

  // TODO: Make the form prettier
  return (
    <>
      <h2>Edit Event</h2>
      {!eventLoading && eventId && (
        <>
          <ManagedTextInput
            label={'Name'}
            value={event.name}
            setValue={() => setEvent({ ...event, name: event.name })}
          />
          <ManagedTextInput
            label={'Description'}
            value={event.description}
            setValue={(value) => setEvent({ ...event, description: value })}
          />
          <ManagedDateInput
            label={'Start Date'}
            value={event.startDate}
            setValue={(value) => setEvent({ ...event, startDate: value })}
          />
          <ManagedDateInput
            label={'End Date'}
            value={event.endDate}
            setValue={(value) => setEvent({ ...event, endDate: value })}
          />
          <ManagedDateInput
            label={'Registration Start'}
            value={event.registrationStart}
            setValue={(value) =>
              setEvent({ ...event, registrationStart: value })
            }
          />
          <ManagedDateInput
            label={'Registration End'}
            value={event.registrationEnd}
            setValue={(value) => setEvent({ ...event, registrationEnd: value })}
          />

          <EditTeams eventUid={eventId} teamRefs={event.teamRefs} />
        </>
      )}
    </>
  );
};

const EditTeams = ({
  eventUid,
  teamRefs,
}: {
  eventUid: string;
  teamRefs: DocumentReference<Team>[];
}) => {
  const [teams, setTeams] = useState<TeamWithUid[]>([]);
  const [teamsLoading, setTeamsLoading] = useState<boolean>(true);
  const [newTeamOwner, setNewTeamOwner] = useState<string>('');

  useEffect(() => {
    Promise.all(teamRefs.map((teamRef) => TeamService.read(teamRef)))
      .then((teams) => {
        setTeams(teams.filter((team) => team != null) as TeamWithUid[]);
        setTeamsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [teamRefs]);

  const addTeam = () => {
    EventService.addTeam(eventUid, newTeamOwner)
      .then((team) => {
        setNewTeamOwner('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>Teams</h2>
      <LoadingWrapper loading={teamsLoading}>
        {teams.map((team, index) => (
          <EditTeam key={index} team={team} />
        ))}
      </LoadingWrapper>
      <ManagedTextInput
        placeholder={'User ID'}
        value={newTeamOwner}
        setValue={setNewTeamOwner}
      />
      <Button disabled={!newTeamOwner} onClick={addTeam}>
        Add Team
      </Button>
    </>
  );
};

const EditTeam = ({ team }: { team: TeamWithUid }) => {
  const [name, setName] = useState<string>(team.name);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    TeamService.update(team.uid, { name })
      .then(() => {
        setLoading(false);
        setError(undefined);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const deleteTeam = () => {
    TeamService.delete(team.uid).then(() => {
      setShow(false);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Button variant={'danger'} onClick={() => setShow(true)}>
          X
        </Button>
        <ConfirmPopup
          onConfirm={deleteTeam}
          message={`Are you sure you want to delete team '${team.name}'?`}
          show={show}
          setShow={setShow}
          action={'Delete'}
        />
        {team.ownerRef.path}
        <br />
        <ManagedTextInput label={'Name'} value={name} setValue={setName} />
        <Button onClick={handleSubmit}>Save</Button>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Card.Body>
    </Card>
  );
};
