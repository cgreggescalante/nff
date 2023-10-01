import styles from './signup.module.scss';
import { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { UserInfoService } from '@shared-data';

export const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user;
        UserInfoService.create(user.uid).then((success) => {
          if (success) {
            navigate('/profile');
          } else {
            setError('Error while creating user');
          }
        });
      })
      .catch((err) => {
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
