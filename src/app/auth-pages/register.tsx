import { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Typography, Button, Stack } from '@mui/joy';
import TextField from '@mui/material/TextField';

export default () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        updateProfile(credential.user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            console.error('Error while updating user profile: ', error);
            toast.error(
              'Failed while setting display name, please update in profile.'
            );
          });
      })
      .catch((err) => {
        console.error('Error while creating user: ', err);
        toast.error('Could not create user at this time.');
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete={'off'}
      style={{ maxWidth: '500px' }}
    >
      <Typography level={'h2'} sx={{ mb: 3 }}>
        Sign Up
      </Typography>
      <Stack spacing={2} direction={'row'} sx={{ mb: 3 }}>
        <TextField
          label={'First Name'}
          fullWidth
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label={'Last Name'}
          fullWidth
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Stack>

      <TextField
        label={'Email'}
        type={'email'}
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2} direction={'row'} sx={{ mb: 3 }}>
        <TextField
          label={'Password'}
          type={'password'}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          label={'Confirm Password'}
          type={'password'}
          fullWidth
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          sx={{ mb: 3 }}
        />
      </Stack>

      <div>
        <Button type={'submit'}>Create Account</Button>
      </div>
    </form>
  );
};