// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from '@shared-ui';
import About from "./about/about";
import Help from "./help/help";
import Home from "./home/home";

export const App = () =>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
    </Routes>
    <Footer />
  </BrowserRouter>

export default App;
