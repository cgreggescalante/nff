import styles from './login.module.scss';
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      setError("Error while attempting to validate credentials. Please verify email and password and try again.");
    }
  }

  const createUserDocument = (user: User) =>
    setDoc(doc(db, "users", user.uid), { uid: user.uid }).then(() => console.log("Added document for user: ", user.uid))
      .catch(e => console.error(e));

  return (
    <div className={styles['container']}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label={"Email"} className={"mb-3"}>
          <Form.Control
            required
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email"}/>
        </FloatingLabel>

        <FloatingLabel label={"Password"}>
          <Form.Control
            required
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Password"}/>
        </FloatingLabel>
        <Button type={"submit"}>Login</Button>
      </Form>

      { error && <p>{ error }</p> }
    </div>
  );
};

export default Login;
