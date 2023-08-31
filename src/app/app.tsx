// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () =>
  <BrowserRouter>
    <Routes>
      <Route path="/about">
        About Page
      </Route>
      <Route path="/help">
        Help Page
      </Route>
    </Routes>
  </BrowserRouter>

export default App;
