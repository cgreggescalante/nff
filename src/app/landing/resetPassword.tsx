import { Button, Card, Stack, Typography } from '@mui/joy';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { auth } from '@shared-data';
import { useState } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { toast } from 'react-toastify';

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [oobCode] = useState(
    new URLSearchParams(location.search).get('oobCode')
  );
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [success, setSuccess] = useState<boolean>(false);

  const handleReset = () => {
    if (!oobCode) {
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    confirmPasswordReset(auth, oobCode, password)
      .then(() => setSuccess(true))
      .catch((error) => {
        console.error(error);
        toast.error('Could not reset your password at this time.');
      });
  };

  if (success) {
    return (
      <Card sx={{ maxWidth: 400 }}>
        <Stack spacing={2}>
          <Typography level={'h2'}>Password reset successfully!</Typography>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </Stack>
      </Card>
    );
  }

  if (!oobCode) {
    return (
      <Card sx={{ maxWidth: 400 }}>
        <Typography level={'h4'}>Invalid password reset link :(</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <Stack>
        <Typography level={'h2'}>Reset Password</Typography>
        <TextField
          label={'New Password'}
          type={'password'}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3, mt: 4 }}
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
        <Button onClick={handleReset}>Submit</Button>
      </Stack>
    </Card>
  );
};
