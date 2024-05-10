import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy';
import useAuth from '../../providers/useAuth';
import { updateProfile } from 'firebase/auth';

export const EditProfile = () => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  );

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(displayName !== user?.displayName);
  }, [displayName, user]);

  const saveChanges = () => {
    if (!user) return;
    updateProfile(user, { displayName })
      .then(() => {
        toast.success('User details updated successfully');
        setEdited(false);
      })
      .catch((error) => {
        console.error('Error while updating user details:', error);
        toast.error('Failed to update user details');
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography level={'h2'}>Edit Profile</Typography>
      </Grid>
      <Grid>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
