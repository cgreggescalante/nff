import styles from './login.module.scss';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(credentials => {
        const user = credentials.user;
        navigate("/")
        console.log(user);
      })
      .catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className={styles['container']}>
      <h1>Login</h1>
      <label>
        Email
        <input type={"email"} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type={"password"} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
      { error }
    </div>
  );
};

export default Login;
