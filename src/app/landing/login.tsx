import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Button, Card, Stack, Typography } from '@mui/joy';
import TextField from '@mui/material/TextField';
import Box from '@mui/joy/Box';

export default () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate(location.pathname === '/login' ? '/' : location.pathname);
    } catch (e) {
      toast.error(
        'Could not login. Please verify email and password and try again.'
      );
    }
  };

  return (
    <Card sx={{ width: 350 }}>
      <form onSubmit={handleSubmit} autoComplete={'off'}>
        <Stack alignItems={'center'} minWidth={'100%'}>
          <Typography level={'h1'} sx={{ mb: 3 }}>
            Login
          </Typography>

          <TextField
            label={'Email'}
            type={'email'}
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1 }}
          />

          <TextField
            label={'Password'}
            type={'password'}
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box>
            <Button type={'submit'}>Login</Button>

            <Button onClick={() => navigate('/register')} sx={{ mt: 2, ml: 1 }}>
              Register
            </Button>
          </Box>

          <Button
            onClick={() => navigate('/forgot-password')}
            sx={{ mt: 1 }}
            variant={'plain'}
          >
            Forgot password?
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
