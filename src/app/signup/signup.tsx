import styles from './signup.module.scss';
import { useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

/* eslint-disable-next-line */
export interface SignupProps {}

export const Signup = (props: SignupProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>()

  const handleSignup = () => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user;
        createUserDocument(user);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }

  const createUserDocument = (user: User) =>
    setDoc(doc(db, "users", user.uid), {
      email: user.email
    }).then(() => console.log("Added document for user: ", user.uid))
      .catch(e => console.error(e));

  return (
    <div className={styles['container']}>
      <h1>Sign Up</h1>
      <label>
        Email
        <input type={"email"} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type={"password"} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={() => handleSignup()}>Sign Up</button>
      <h4>{ error }</h4>
    </div>
  );
}

export default Signup;
