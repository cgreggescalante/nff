import { Route, Routes } from 'react-router-dom';
import UserDashboard from './user-data/user-dashboard';
import AdminTools from './admin-tools';
import { AdminRoute, EventOwnerRoute, ProtectedRoute } from '../components';
import {
  EditEvent,
  EditProfile,
  Event,
  Events,
  ForgotPassword,
  Home,
  Login,
  ResetPassword,
  Upload,
} from '../views';
import Draft from './event/event-detail/draft';
import Register from '../views/register';
import RegisterForEvent from './event/event-detail/registerForEvent';

export const MainContent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Register />} />
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
      path="/events/:eventId/register"
      element={
        <ProtectedRoute>
          <RegisterForEvent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/events/:eventId/draft"
      element={
        <EventOwnerRoute>
          <Draft />
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
