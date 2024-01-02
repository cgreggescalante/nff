import {
  createTeamByOwner,
  EventWithMetadata,
  getTeamsByEvent,
  readUser,
  TeamWithMetaData,
} from '@shared-data';
import { useEffect, useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/joy';
import { EditTeam } from './edit-team';

export const EditTeams = ({ event }: { event: EventWithMetadata }) => {
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

  if (teamsLoading) return <p>Loading...</p>;

  return (
    <Grid container rowSpacing={2} columnSpacing={1} columns={3}>
      <Grid xs={3}>
        <Typography level={'h3'}>Teams</Typography>
      </Grid>
      {teams.map((team, index) => (
        <EditTeam key={index} event={event} team={team} />
      ))}
      <Grid xs={2}>
        <Input
          value={newTeamOwner}
          placeholder={'Owner ID'}
          onChange={(e) => setNewTeamOwner(e.target.value)}
        />
      </Grid>
      <Grid>
        <Button disabled={!newTeamOwner} onClick={addTeam}>
          Add Team
        </Button>
      </Grid>
    </Grid>
  );
};
