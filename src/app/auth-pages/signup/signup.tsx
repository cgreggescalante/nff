import styles from './signup.module.scss';
import { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { UserInfoService } from '@shared-data';
import { auth } from '../../../firebase';
import useUser from '../../../providers/useUser';

export const Signup = () => {
  const { login } = useUser();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        UserInfoService.createFromId(credentials.user.uid, firstName, lastName)
          .then((userInfo) => {
            login(userInfo);
            navigate('/');
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
        <InputGroup className={'mb-2 mt-4'}>
          <FloatingLabel label={'First Name'} className={'me-2'}>
            <Form.Control
              required
              type={'text'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={'First Name'}
            />
          </FloatingLabel>
          <FloatingLabel label={'Last Name'}>
            <Form.Control
              required
              type={'text'}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={'Last Name'}
            />
          </FloatingLabel>
        </InputGroup>

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

        <FloatingLabel label={'Confirm Password'} className={'mb-2'}>
          <Form.Control
            required
            type={'password'}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
