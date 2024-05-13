import { Button, Stack, Typography } from '@mui/joy';
import TextField from '@mui/material/TextField';
import { FormEvent, useState } from 'react';
import { functions } from '@shared-data';
import { toast } from 'react-toastify';
import { httpsCallable } from 'firebase/functions';

const EMAIL_REGEX = /[\w.]+@([\w-]+\.)+[\w-]{2,4}/;

export default () => {
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setProcessing(true);

    const sendPasswordResetEmail = httpsCallable(
      functions,
      'sendPasswordResetEmail'
    );

    sendPasswordResetEmail({ email })
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred. Please try again.');
      })
      .finally(() => setProcessing(false));
  };

  if (emailSent) {
    return (
      <Stack spacing={2} maxWidth={'400px'} alignItems={'center'}>
        <Typography level={'h2'}>Submitted successfully!</Typography>
        <Typography level={'body-md'} textAlign={'center'}>
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
          <Button disabled={processing} type={'submit'}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
