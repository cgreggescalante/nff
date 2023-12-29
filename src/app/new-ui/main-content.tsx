import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../../providers/useUser';
import Home from '../home/home';
import Signup from '../auth-pages/signup';
import Login from '../auth-pages/login';
import EventList from '../event/event-list/event-list';
import EventDetail from '../event/event-detail/event-detail';
import { EditEvent } from '../event/event-detail/edit-event';
import ProtectedRoute from '../components/routes/protected-route';
import Upload from '../upload/upload';
import Profile from '../user-data/profile/profile';
import UserDashboard from '../user-data/user-dashboard';
import { AdminRoute } from '../components/routes/admin-route';
import AdminTools from '../admin-tools/admin-tools';
import { Box } from '@mui/system';

export const MainContent = ({
  margin,
  headerHeight,
}: {
  margin: number;
  headerHeight: number;
}) => (
  <Box
    style={{
      width: `100% - ${margin}px`,
      maxWidth: 800,
      marginLeft: `${margin}px`,
      marginTop: headerHeight,
    }}
    sx={{ p: 4 }}
  >
    <Routes>
      <Route
        path="/"
        element={
          <UserProvider>
            <Home />
          </UserProvider>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
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
  </Box>
);
