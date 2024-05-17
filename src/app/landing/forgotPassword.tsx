import { Button, Input, Stack, Typography } from '@mui/joy';
import TextField from '@mui/material/TextField';
import { FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from '@shared-data';
import { toast } from 'react-toastify';
import Layout from './layout';

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

  return (
    <Layout>
      {emailSent ? (
        <Stack spacing={3} alignItems={'center'}>
          <Typography level={'h2'}>Submitted successfully!</Typography>
          <Typography level={'body-md'} textAlign={'center'}>
            If there is an account registered to that email, you'll receive a
            link with instructions on resetting your password.
          </Typography>
        </Stack>
      ) : (
        <form onSubmit={submit}>
          <Stack spacing={5} alignItems={'center'}>
            <Typography level={'h2'}>Forgot Password</Typography>
            <Stack direction={'row'} spacing={1}>
              <Input
                type={'email'}
                placeholder={'Email *'}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button disabled={processing} type={'submit'}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Layout>
  );
};
