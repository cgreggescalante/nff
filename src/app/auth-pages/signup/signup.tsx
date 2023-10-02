import styles from './signup.module.scss';
import { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { UserInfoService } from '@shared-data';
import { useUser } from '../../../userContext';
import { auth } from '../../../firebase';

export const Signup = () => {
  const { login } = useUser();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        UserInfoService.createFromId(credentials.user.uid)
          .then((userInfo) => {
            login(userInfo);
            navigate('/profile');
          })
          .catch((error) => {
            console.error('Error while creating user document: ', error);
            setError('Could not create user document');
          });
      })
      .catch((err) => {
        console.error('Error while creating user: ', err);
        setError(err.message);
      });
  };

  return (
    <div className={styles['container']}>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSubmit}>
        <FloatingLabel label={'Email'} className={'mb-3'}>
          <Form.Control
            required
            type={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
          />
        </FloatingLabel>

        <FloatingLabel label={'Password'}>
          <Form.Control
            required
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Password'}
          />
        </FloatingLabel>
        <Button type={'submit'}>Sign Up</Button>
      </Form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
