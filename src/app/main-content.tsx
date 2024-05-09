import { Route, Routes } from 'react-router-dom';
import Upload from './upload/upload';
import UserDashboard from './user-data/user-dashboard';
import AdminTools from './admin-tools';
import EditProfile from './user-data/edit-profile';
import { AdminRoute, ProtectedRoute, EventOwnerRoute } from '../components';
import {
  EditEvent,
  Event,
  Events,
  ForgotPassword,
  Home,
  Login,
  ResetPassword,
  Signup,
} from '../views';

export const MainContent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/events" element={<Events />} />
    <Route path="/events/:eventId" element={<Event />} />
    <Route
      path="/events/:eventId/edit"
      element={
        <EventOwnerRoute>
          <EditEvent />
        </EventOwnerRoute>
      }
    />
    <Route
      path="/upload"
      element={
        <ProtectedRoute>
          <Upload />
        </ProtectedRoute>
      }
    />
    <Route
      path="/edit-profile"
      element={
        <ProtectedRoute>
          <EditProfile />
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
);
