import { ChangeEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Box, Button, Input, Typography } from '@mui/joy';

export default () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      toast.error(
        'Could not login. Please verify email and password and try again.'
      );
    }
  };

  return (
    <Box>
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

        <Button type={'submit'}>Login</Button>
      </form>
    </Box>
  );
};
