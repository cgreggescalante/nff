import { Route, Routes } from 'react-router-dom';
import Home from './home/home';
import EventList from './event/event-list/event-list';
import EventDetail from './event/event-detail/event-detail';
import { EditEvent } from './event/event-detail/edit-event';
import Upload from './upload/upload';
import UserDashboard from './user-data/user-dashboard';
import AdminTools from './admin-tools';
import { AdminRoute, ProtectedRoute } from './components';
import { ForgotPassword, Login, ResetPassword, Signup } from './auth-pages';
import { EventOwnerRoute } from './components/event-owner-route';
import EditProfile from './user-data/edit-profile';

export const MainContent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/events" element={<EventList />} />
    <Route path="/events/:eventId" element={<EventDetail />} />
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
