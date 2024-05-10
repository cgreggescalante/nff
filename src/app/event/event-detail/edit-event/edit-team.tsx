import { EventWithMetadata, TeamWithMetaData } from '@shared-data';
import { ConfirmPopup } from '@shared-ui';
import { Button, Grid, Input } from '@mui/joy';
import useEditTeamController from '../../../../controllers/useEditTeamController';

export const EditTeam = ({
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
