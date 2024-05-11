import { Button, Stack, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';

export default () => {
  const navigate = useNavigate();

  return (
    <Stack alignItems={'center'}>
      <Typography level={'h1'}>Welcome to Fantasy Fitness!</Typography>

      <Typography>Get started by creating an account or logging in.</Typography>

      <Box>
        <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Login
        </Button>
        <Button onClick={() => navigate('/register')} sx={{ mt: 2, ml: 1 }}>
          Create Account{' '}
        </Button>
      </Box>
    </Stack>
  );
};
