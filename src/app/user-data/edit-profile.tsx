import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useCurrentUser, { useUpdateUser } from '../../providers/useUser';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy';

export const EditProfile = () => {
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
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography level={'h2'}>Edit Profile</Typography>
      </Grid>
      <Grid>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
      </Grid>

      <Grid xs={12}>
        <Button disabled={!edited} onClick={saveChanges}>
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
