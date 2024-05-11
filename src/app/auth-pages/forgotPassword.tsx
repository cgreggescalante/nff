import { Button, Stack, Typography } from '@mui/joy';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { auth } from '@shared-data';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const EMAIL_REGEX = /[\w.]+@([\w-]+\.)+[\w-]{2,4}/;

export default () => {
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const submit = () => {
    if (!EMAIL_REGEX.test(email)) {
      toast.error('Please enter a valid email address');
    } else {
      sendPasswordResetEmail(auth, email)
        .then()
        .catch(() => null);
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <Stack spacing={2} maxWidth={'400px'} alignItems={'center'}>
        <Typography level={'h2'}>Submitted successfully!</Typography>
        <Typography level={'body-md'} align={'center'}>
          If there is an account registered to that email, you'll receive a link
          with instructions on resetting your password.
        </Typography>
      </Stack>
    );
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: '400px' }}>
      <Stack spacing={3} alignItems={'center'}>
        <Typography level={'h2'}>Forgot Password</Typography>
        <Stack direction={'row'} spacing={1}>
          <TextField
            size={'small'}
            type={'email'}
            label={'Email'}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type={'submit'}>Submit</Button>
        </Stack>
      </Stack>
    </form>
  );
};
