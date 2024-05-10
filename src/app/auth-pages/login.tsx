import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Button, Typography } from '@mui/joy';
import TextField from '@mui/material/TextField';

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (e) {
      toast.error(
        'Could not login. Please verify email and password and try again.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete={'off'}
      style={{ maxWidth: '500px' }}
    >
      <Typography level={'h2'} sx={{ mb: 3 }}>
        Login
      </Typography>

      <TextField
        label={'Email'}
        type={'email'}
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TextField
        label={'Password'}
        type={'password'}
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 3 }}
      />

      <div>
        <Button type={'submit'}>Login</Button>
      </div>

      <div>
        <Button onClick={() => navigate('/forgot-password')} sx={{ mt: 3 }}>
          Forgot password?
        </Button>
      </div>
    </form>
  );
};
