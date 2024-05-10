import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import { MainContent } from './main-content';
import { Layout } from '../components';

export const App = () => (
  <div className={styles['app']}>
    <ToastContainer
      position="bottom-right"
      hideProgressBar
      newestOnTop
      transition={Slide}
    />

    <Layout>
      <MainContent />
    </Layout>
  </div>
);

export default App;
