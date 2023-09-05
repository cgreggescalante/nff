// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from '@shared-ui';

export const App = () =>
  <BrowserRouter>
    <Routes>
      <Route path="/">
        Home Page
      </Route>
      <Route path="/about">
        About Page
      </Route>
      <Route path="/help">
        Help Page
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>

export default App;
