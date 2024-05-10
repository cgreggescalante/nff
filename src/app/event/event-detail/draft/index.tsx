import { useParams } from 'react-router-dom';
import { useEvent } from '../../../../providers/queries';
import { useEffect, useState } from 'react';
import {
  EntryWithMetaData,
  EventWithMetadata,
  getTeamsByEvent,
  getUsersByEvent,
  TeamWithMetaData,
  UserInfoWithMetaData,
} from '@shared-data';
import { Stack, Table, Typography } from '@mui/joy';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

export default () => {
  const { eventId } = useParams();

  const { data: serverEvent, isLoading } = useEvent(eventId ? eventId : '');
  const [event, setEvent] = useState<EventWithMetadata>();

  const [teams, setTeams] = useState<TeamWithMetaData[]>([]);

  const [athleteData, setAthleteData] = useState<
    { user: UserInfoWithMetaData; entry: EntryWithMetaData }[]
  >([]);

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

    getUsersByEvent(event).then(setAthleteData);
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
          {athleteData
            .filter(({ entry }) => !entry.teamRef)
            .map(({ user }) => (
              <tr>
                <td>
                  {user.firstName} {user.lastName}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Stack>
  );
};
