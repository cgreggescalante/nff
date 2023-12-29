import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useCurrentUser, { useUpdateUser } from '../../../providers/useUser';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Input, Typography } from '@mui/joy';

export const EditUser = () => {
  const userInfo = useCurrentUser();
  const updateUser = useUpdateUser();

  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(
      firstName !== userInfo.firstName || lastName !== userInfo.lastName
    );
  }, [userInfo, firstName, lastName]);

  const saveChanges = () =>
    updateUser({
      firstName,
      lastName,
    })
      .then((_) => {
        toast.success('User details updated successfully');
        setEdited(false);
      })
      .catch((error) => {
        console.error('Error while updating user details:', error);
        toast.error('Failed to update user details');
      });

  return (
    <Grid container>
      <Grid item>
        <Typography level={'body-md'}>Name</Typography>
      </Grid>
      <Grid container item>
        <Grid item>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item>
        <Button disabled={!edited} onClick={saveChanges}>
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditUser;
