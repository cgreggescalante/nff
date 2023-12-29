import {
  deleteTeam,
  EventWithMetadata,
  TeamWithMetaData,
  updateTeamName,
} from '@shared-data';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import { ConfirmPopup } from '@shared-ui';
import { Button, Input } from '@mui/joy';

export const EditTeam = ({
  event,
  team,
}: {
  event: EventWithMetadata;
  team: TeamWithMetaData;
}) => {
  const [name, setName] = useState<string>(team.name);

  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    updateTeamName(event.uid, team.uid, name)
      .then(() => {
        toast.success('Team name updated', { toastId: 'edit-team' });
      })
      .catch(() => {
        toast.error('Could not update team name', { toastId: 'edit-team' });
      });
  };

  const handleDeleteTeam = () => {
    deleteTeam(event.uid, team.uid).then(() => {
      setShow(false);
    });
  };

  return (
    <Grid container>
      <ConfirmPopup
        onConfirm={handleDeleteTeam}
        message={`Are you sure you want to delete team '${team.name}'?`}
        show={show}
        setShow={setShow}
        action={'Delete'}
      />
      <Grid container item>
        {team.ownerRef.path}
      </Grid>
      <Grid item>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit}>Save</Button>
      </Grid>
      <Grid item>
        <Button onClick={() => setShow(true)}>X</Button>
      </Grid>
    </Grid>
  );
};