import styles from './login.module.scss';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>("");
  
  const handleLogin = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const user = credentials.user;

      if (!user) throw new Error("No user found with that email and password");

      const userDocRef = doc(db, "users", user.uid);

      const snapshot = await getDoc(userDocRef);

      if (!snapshot.exists())
        await createUserDocument(user);

      navigate("/");
    } catch (e) {
      setError(e);
    }
  }

  const createUserDocument = (user: User) =>
    setDoc(doc(db, "users", user.uid), { uid: user.uid }).then(() => console.log("Added document for user: ", user.uid))
      .catch(e => console.error(e));

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
