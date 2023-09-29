// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./about/about";
import Help from "./help/help";
import Home from "./home/home";
import Upload from "./upload/upload";
import { Footer, Header } from "@shared-ui";
import Signup from "./signup/signup";
import Login from "./login/login";
import { auth } from "../firebase";
import Profile from "./profile/profile";
import AdminTools from './admin-tools/admin-tools';
import { useUser } from "../userContext";
import { Container } from "react-bootstrap";

export const App = () => {
  const { user, loading } = useUser();

  return (
    <div className={styles["app"]}>
      <BrowserRouter basename={"/"}>
        <Header user={user} loading={loading} auth={auth} />

        <Container className={styles["content"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-tools" element={<AdminTools />} />
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter>
    </div>
  )
}



export default App;
