import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import { NewUiTest } from './new-ui/new-ui-test';

export const App = () => (
  <div className={styles['app']}>
    <ToastContainer
      position="bottom-right"
      hideProgressBar
      newestOnTop
      transition={Slide}
    />

    <NewUiTest />
  </div>
);

export default App;
