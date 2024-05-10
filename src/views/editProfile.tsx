import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy';
import useEditProfileController from '../controllers/useEditProfileController';

export default () => {
  const { displayName, setDisplayName, edited, saveChanges } =
    useEditProfileController();

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
