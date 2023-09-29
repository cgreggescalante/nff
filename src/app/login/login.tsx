import styles from './login.module.scss';
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { UserInfoServiceClass } from "@shared-data";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userInfoService] = useState(new UserInfoServiceClass());

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const user = credentials.user;

      if (!user) throw new Error("No user found with that email and password");

      const userInfo = await userInfoService.getById(user.uid);

      if (userInfo == null) {
        userInfoService.create(user.uid)
          .then(success => {
            if (success) {
              navigate("/profile");
            } else {
              setError("Error while creating user");
            }
          });
      }

      navigate("/");
    } catch (e) {
      setError("Error while attempting to validate credentials. Please verify email and password and try again.");
    }
  }

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
