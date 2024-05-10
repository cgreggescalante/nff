import { useParams } from 'react-router-dom';
import { useEvent } from '../../../../providers/queries';
import { useEffect, useState } from 'react';
import {
  EntryWithMetaData,
  EventWithMetadata,
  getEntriesByEvent,
  getTeamsByEvent,
  TeamWithMetaData,
} from '@shared-data';
import { Stack, Table, Typography } from '@mui/joy';

export default () => {
  const { eventId } = useParams();

  const { data: serverEvent, isLoading } = useEvent(eventId ? eventId : '');
  const [event, setEvent] = useState<EventWithMetadata>();

  const [teams, setTeams] = useState<TeamWithMetaData[]>([]);

  const [entries, setEntries] = useState<EntryWithMetaData[]>([]);

  useEffect(() => {
    if (serverEvent) setEvent(serverEvent);
  }, [serverEvent]);

  useEffect(() => {
    if (!event) return;
    getTeamsByEvent(event.uid)
      .then((teams) => {
        setTeams(teams);
      })
      .catch((error) => console.error(error));

    getEntriesByEvent(event).then(setEntries);
  }, [event]);

  if (isLoading) return <p>Loading...</p>;
  if (!event) return <p>No event found with id {eventId}</p>;

  return (
    <Stack>
      <Typography level={'h2'}>Draft</Typography>

      <Typography level={'h3'}>Teams</Typography>
      <Table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Current Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr>
              <td>{team.name}</td>
              <td>{team.entryRefs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Typography level={'h3'}>Available Athletes</Typography>
      <Table>
        <thead>
          <tr>
            <th>Athlete</th>
            <th>Select Team</th>
          </tr>
        </thead>
        <tbody>
          {entries
            .filter((entry) => !entry.teamRef)
            .map((entry) => (
              <tr>
                <td>{entry.userDisplayName}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Stack>
  );
};
