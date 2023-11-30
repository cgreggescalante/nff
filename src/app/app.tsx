import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home/home';
import Upload from './upload/upload';
import AdminTools from './admin-tools/admin-tools';
import { Container } from 'react-bootstrap';
import UserDashboard from './user-data/dashboard/user-dashboard';
import { Header } from './components/header/header';
import ProtectedRoute from './components/routes/protected-route';
import Signup from './auth-pages/signup/signup';
import Login from './auth-pages/login/login';
import Profile from './user-data/profile/profile';
import Footer from './components/footer/footer';
import Leaderboard from './leaderboard/leaderboard';
import { AdminRoute } from './components/routes/admin-route';
import EventList from './event/event-list/event-list';
import EventDetail from './event/event-detail/event-detail';
import { EditEvent } from './event/event-detail/edit-event';

export const App = () => (
  <div className={styles['app']}>
    <BrowserRouter basename={'/'}>
      <Header />

      <Container className={styles['content']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          // TODO: Require event owner
          <Route path="/events/:eventId/edit" element={<EditEvent />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-tools"
            element={
              <AdminRoute>
                <AdminTools />
              </AdminRoute>
            }
          />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
