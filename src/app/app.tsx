// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./about/about";
import Help from "./help/help";
import Home from "./home/home";
import Upload from "./upload/upload";
import { Header } from "@shared-ui";

export const App = () =>
  <BrowserRouter basename={"/nff/"}>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  </BrowserRouter>


export default App;
