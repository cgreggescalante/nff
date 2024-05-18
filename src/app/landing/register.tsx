import { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Button, Grid, Input, Typography } from '@mui/joy';
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
      <form
        onSubmit={handleSubmit}
        style={{
          alignItems: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography level={'h2'} sx={{ mb: 1 }}>
          Register
        </Typography>
        <Typography level={'body-sm'} sx={{ mb: 1 }}>
          Name cannot be changed later.
        </Typography>

        <Grid container sx={{ flexGrow: 1 }} rowSpacing={0.5} columnSpacing={1}>
          <Grid xs={6}>
            <Input
              fullWidth
              placeholder={'First Name *'}
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid xs={6}>
            <Input
              fullWidth
              placeholder={'Last Name *'}
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>

          <Grid xs={12}>
            <Input
              placeholder={'Email *'}
              type={'email'}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid xs={6}>
            <Input
              fullWidth
              placeholder={'Password *'}
              type={'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid xs={6}>
            <Input
              fullWidth
              placeholder={'Confirm Password *'}
              type={'password'}
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button type={'submit'}>Create Account</Button>
      </form>
    </Layout>
  );
};
