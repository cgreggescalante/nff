import styles from './signup.module.scss';
import { useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>()

  const navigate = useNavigate();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user;
        createUserDocument(user)
          .then(_ => navigate("/profile"));
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  const createUserDocument = (user: User) =>
    setDoc(doc(db, "users", user.uid), { uid: user.uid }).then(() => console.log("Added document for user: ", user.uid))
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
