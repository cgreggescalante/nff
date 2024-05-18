import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Button, Input, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Layout from './layout';

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
    <Layout>
      <form
        onSubmit={handleSubmit}
        autoComplete={'off'}
        style={{
          alignItems: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography level={'h2'} sx={{ mb: 2 }}>
          Login
        </Typography>

        <Input
          size={'md'}
          placeholder={'Email *'}
          type={'email'}
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 1 }}
        />

        <Input
          size={'md'}
          placeholder={'Password *'}
          type={'password'}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box>
          <Button type={'submit'}>Login</Button>

          <Button onClick={() => navigate('/register')} sx={{ ml: 1 }}>
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
      </form>
    </Layout>
  );
};
