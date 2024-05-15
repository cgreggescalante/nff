import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import MainContent from './mainContent';
import useAuth from '../providers/useAuth';
import Landing from './landing';

export default () => {
  const { loading, user } = useAuth();

  if (loading) return null;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        newestOnTop
        transition={Slide}
      />

      {user ? (
        <div className={styles['app']}>
          <MainContent />
        </div>
      ) : (
        <Landing />
      )}
    </>
  );
};
