import styles from './signup.module.scss';
import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>()

  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

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
}

export default Signup;
