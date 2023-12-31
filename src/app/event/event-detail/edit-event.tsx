import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  createTeamByOwner,
  deleteTeam,
  EventWithMetadata,
  getTeamsByEvent,
  readEvent,
  readUser,
  TeamWithMetaData,
  updateTeamName,
} from '@shared-data';
import { Button, Card } from 'react-bootstrap';
import {
  ConfirmPopup,
  LoadingWrapper,
  ManagedDateInput,
  ManagedTextInput,
} from '@shared-ui';
import { toast } from 'react-toastify';

// TODO: add route protection to check if the user is an event owner
export const EditEvent = () => {
  const location = useLocation();
  const { eventId } = useParams();

  const [event, setEvent] = useState<EventWithMetadata>(
    location.state as EventWithMetadata
  );
  const [eventLoading, setEventLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!event && eventId)
      readEvent(eventId)
        .then((event) => {
          if (event != null) {
            setEvent(event);
            document.title = event.name;
          } else toast.error('Could not find event', { toastId: 'edit-event' });
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
      {!eventLoading && eventId && event && (
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

          <EditTeams event={event} />
        </>
      )}
    </>
  );
};

const EditTeams = ({ event }: { event: EventWithMetadata }) => {
  const [teams, setTeams] = useState<TeamWithMetaData[]>([]);
  const [teamsLoading, setTeamsLoading] = useState<boolean>(true);
  const [newTeamOwner, setNewTeamOwner] = useState<string>('');

  useEffect(() => {
    getTeamsByEvent(event.uid)
      .then((teams) => {
        setTeams(teams);
        setTeamsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [event]);

  const addTeam = async () => {
    const owner = await readUser(newTeamOwner);

    if (!owner) console.error('No user found with the given ID');
    else
      createTeamByOwner(event, owner)
        .then(() => {
          setNewTeamOwner('');
        })
        .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>Teams</h2>
      <LoadingWrapper loading={teamsLoading}>
        {teams.map((team, index) => (
          <EditTeam key={index} event={event} team={team} />
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

const EditTeam = ({
  event,
  team,
}: {
  event: EventWithMetadata;
  team: TeamWithMetaData;
}) => {
  const [name, setName] = useState<string>(team.name);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    updateTeamName(event.uid, team.uid, name)
      .then(() => {
        setLoading(false);
        setError(undefined);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const handleDeleteTeam = () => {
    deleteTeam(event.uid, team.uid).then(() => {
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
          onConfirm={handleDeleteTeam}
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
