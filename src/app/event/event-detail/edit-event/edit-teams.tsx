import {
  createTeamByOwner,
  EventWithMetadata,
  getTeamsByEvent,
  readUser,
  TeamWithMetaData,
} from '@shared-data';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/joy';
import { LoadingWrapper, ManagedTextInput } from '@shared-ui';
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

  return (
    <Grid container>
      <Grid item>
        <Typography level={'h2'}>Teams</Typography>
      </Grid>
      <LoadingWrapper loading={teamsLoading}>
        {teams.map((team, index) => (
          <EditTeam key={index} event={event} team={team} />
        ))}
      </LoadingWrapper>
      <Grid container>
        <Grid item>
          <ManagedTextInput
            placeholder={'User ID'}
            value={newTeamOwner}
            setValue={setNewTeamOwner}
          />
        </Grid>
        <Grid item>
          <Button disabled={!newTeamOwner} onClick={addTeam}>
            Add Team
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
