import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home/home';
import Upload from './upload/upload';
import AdminTools from './admin-tools/admin-tools';
import { Container } from 'react-bootstrap';
import { Header } from './components/header/header';
import ProtectedRoute from './components/routes/protected-route';
import Signup from './auth-pages/signup/signup';
import Login from './auth-pages/login/login';
import Profile from './user-data/profile/profile';
import Footer from './components/footer/footer';
import { AdminRoute } from './components/routes/admin-route';
import EventList from './event/event-list/event-list';
import EventDetail from './event/event-detail/event-detail';
import { EditEvent } from './event/event-detail/edit-event';
import UserDashboard from './user-data/user-dashboard';
import { Slide, ToastContainer } from 'react-toastify';
import { UserProvider } from '../providers/useUser';
import { NewUiTest } from './new-ui-test';

export const App = () => (
  <div className={styles['app']}>
    <ToastContainer
      position="bottom-right"
      hideProgressBar
      newestOnTop
      transition={Slide}
    />

    <NewUiTest />

    {/*<BrowserRouter basename={'/'}>*/}
    {/*  <Header />*/}

    {/*  <Container className={styles['content']}>*/}
    {/*    <Routes>*/}
    {/*      <Route*/}
    {/*        path="/"*/}
    {/*        element={*/}
    {/*          <UserProvider>*/}
    {/*            <Home />*/}
    {/*          </UserProvider>*/}
    {/*        }*/}
    {/*      />*/}
    {/*      <Route path="/signup" element={<Signup />} />*/}
    {/*      <Route path="/login" element={<Login />} />*/}
    {/*      <Route path="/events" element={<EventList />} />*/}
    {/*      <Route path="/events/:eventId" element={<EventDetail />} />*/}
    {/*      // TODO: Require event owner*/}
    {/*      <Route path="/events/:eventId/edit" element={<EditEvent />} />*/}
    {/*      <Route*/}
    {/*        path="/upload"*/}
    {/*        element={*/}
    {/*          <ProtectedRoute>*/}
    {/*            <Upload />*/}
    {/*          </ProtectedRoute>*/}
    {/*        }*/}
    {/*      />*/}
    {/*      <Route*/}
    {/*        path="/profile"*/}
    {/*        element={*/}
    {/*          <ProtectedRoute>*/}
    {/*            <Profile />*/}
    {/*          </ProtectedRoute>*/}
    {/*        }*/}
    {/*      />*/}
    {/*      <Route*/}
    {/*        path="/user-dashboard"*/}
    {/*        element={*/}
    {/*          <ProtectedRoute>*/}
    {/*            <UserDashboard />*/}
    {/*          </ProtectedRoute>*/}
    {/*        }*/}
    {/*      />*/}
    {/*      <Route*/}
    {/*        path="/admin-tools"*/}
    {/*        element={*/}
    {/*          <AdminRoute>*/}
    {/*            <AdminTools />*/}
    {/*          </AdminRoute>*/}
    {/*        }*/}
    {/*      />*/}
    {/*    </Routes>*/}
    {/*  </Container>*/}

    {/*  <Footer />*/}
    {/*</BrowserRouter>*/}
  </div>
);

export default App;
