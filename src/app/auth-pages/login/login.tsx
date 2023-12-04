import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createUserFromAuth, readUser } from '@shared-data';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credentials.user;

      const userInfo = await readUser(user.uid);

      if (userInfo == null) {
        createUserFromAuth()
          .then(() => {
            toast.success('Welcome! Please enter your name.');
            navigate('/profile');
          })
          .catch(() =>
            toast.error(
              'Could not find user profile. A new profile could not be created at this time.'
            )
          );
      } else {
        navigate('/');
      }
    } catch (e) {
      toast.error(
        'Could not login. Please verify email and password and try again.'
      );
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label={'Email'} className={'mb-2'}>
          <Form.Control
            required
            type={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
          />
        </FloatingLabel>

        <FloatingLabel label={'Password'} className={'mb-2'}>
          <Form.Control
            required
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Password'}
          />
        </FloatingLabel>
        <Button type={'submit'}>Login</Button>
      </Form>
    </>
  );
};

export default Login;
