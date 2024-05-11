import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import { MainContent } from './main-content';
import { Layout } from '../components';
import useAuth from '../providers/useAuth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '../views/register';
import { ForgotPassword, Login, ResetPassword } from '../views';
import { AuthLayout } from './auth-pages/authLayout';
import Landing from './auth-pages/landing';

export const App = () => {
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
          <Layout>
            <MainContent />
          </Layout>
        </div>
      ) : (
        <AuthLayout>
          <BrowserRouter basename={'/'}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path={'/login'} element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthLayout>
      )}
    </>
  );
};

export default App;
