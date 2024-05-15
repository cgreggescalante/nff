import {
  createTeamByOwner,
  EventWithMetadata,
  getTeamsByEvent,
  readEntry,
  TeamWithMetaData,
} from '@shared-data';
import { useEffect, useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/joy';
import useEditTeamController from '../../../../controllers/useEditTeamController';
import { ConfirmPopup } from '../../../../components';

export default ({ event }: { event: EventWithMetadata }) => {
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
    const owner = await readEntry(event.uid, newTeamOwner);

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
          placeholder={'Entry ID for Team Owner'}
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

const EditTeam = ({
  event,
  team,
}: {
  event: EventWithMetadata;
  team: TeamWithMetaData;
}) => {
  const { handleDeleteTeam, show, setShow, name, setName, handleSubmit } =
    useEditTeamController(event, team);

  return (
    <>
      <ConfirmPopup
        onConfirm={handleDeleteTeam}
        message={`Are you sure you want to delete team '${team.name}'?`}
        show={show}
        setShow={setShow}
        action={'Delete'}
      />
      <Grid xs={3}>Owner Entry ID: {team.ownerEntryRef.id}</Grid>
      <Grid>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Grid>
      <Grid>
        <Button onClick={handleSubmit}>Save</Button>
      </Grid>
      <Grid>
        <Button onClick={() => setShow(true)}>X</Button>
      </Grid>
    </>
  );
};
