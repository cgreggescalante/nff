import { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Button, Card, Input, Stack, Typography } from '@mui/joy';
import TextField from '@mui/material/TextField';
import Layout from './layout';

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

        if (err.code === 'auth/email-already-in-use')
          toast.error(
            'Email is already in use, please sign in or use a different email.'
          );
        else toast.error('Could not create user at this time.');
      });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Stack alignItems={'center'} maxWidth={400}>
          <Typography level={'h2'} sx={{ mb: 1 }}>
            Register
          </Typography>
          <Typography level={'body-sm'} sx={{ mb: 1 }}>
            Name cannot be changed later.
          </Typography>

          <Stack spacing={1} direction={'row'} sx={{ mb: 2 }} maxWidth={400}>
            <Input
              placeholder={'First Name *'}
              fullWidth
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder={'Last Name *'}
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>

          <Input
            placeholder={'Email *'}
            type={'email'}
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Stack spacing={1} direction={'row'} sx={{ mb: 2 }} maxWidth={400}>
            <Input
              placeholder={'Password *'}
              type={'password'}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder={'Confirm Password *'}
              type={'password'}
              fullWidth
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Stack>

          <Button type={'submit'}>Create Account</Button>
        </Stack>
      </form>
    </Layout>
  );
};
