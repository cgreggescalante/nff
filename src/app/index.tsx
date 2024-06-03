import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import MainContent from './mainContent';
import Landing from './landing';
import { useAuth } from 'common-react';

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
