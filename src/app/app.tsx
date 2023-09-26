// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./about/about";
import Help from "./help/help";
import Home from "./home/home";
import Upload from "./upload/upload";
import { Header } from "@shared-ui";
import Signup from "./signup/signup";
import Login from "./login/login";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./profile/profile";
import AdminTools from './admin-tools/admin-tools';

export const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => user ? setAuthenticated(true) : setAuthenticated(false))
  });

  return (
    <BrowserRouter basename={"/"}>
      <Header auth={auth} authenticated={authenticated} />
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
    </BrowserRouter>
  )
}



export default App;
