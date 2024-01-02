import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import { Layout } from './new-ui/layout';
import { MainContent } from './new-ui/main-content';

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
