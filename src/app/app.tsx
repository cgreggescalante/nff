// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './about/about';
import Help from './help/help';
import Home from './home/home';
import Upload from './upload/upload';
import { Footer, Header, ProtectedRoute } from '@shared-ui';
import Signup from './signup/signup';
import Login from './login/login';
import { auth } from '../firebase';
import Profile from './profile/profile';
import AdminTools from './admin-tools/admin-tools';
import { useUser } from '../userContext';
import { Container } from 'react-bootstrap';
import UserDashboard from './user-data/user-dashboard/user-dashboard';

export const App = () => {
  const { user, loading } = useUser();

  return (
    <div className={styles['app']}>
      <BrowserRouter basename={'/'}>
        <Header user={user} loading={loading} auth={auth} />

        <Container className={styles['content']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute isAuthenticated={!loading && user != null}>
                  <Upload />
                </ProtectedRoute>
              }
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={!loading && user != null}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute isAuthenticated={!loading && user != null}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-tools"
              element={
                <ProtectedRoute
                  isAuthenticated={
                    !loading && user != null && user.role === 'admin'
                  }
                >
                  <AdminTools />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
