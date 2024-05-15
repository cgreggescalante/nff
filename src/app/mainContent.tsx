import { Navigate, Route, Routes } from 'react-router-dom';
import UserDashboard from './user-data/user-dashboard';
import AdminTools from './admin-tools';
import { AdminRoute, EventOwnerRoute, Layout } from '../components';
import Draft from './event/event-detail/draft';
import RegisterForEvent from './event/event-detail/registerForEvent';
import EditEvent from './event/event-detail/edit-event';
import Home from './home';
import EventList from './event/event-list/event-list';
import EventDetail from './event/event-detail/eventDetail';
import Upload from './upload';

export default () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Navigate replace to={'/'} />} />
      <Route path="/login" element={<Navigate replace to={'/'} />} />
      <Route path="/forgot-password" element={<Navigate replace to={'/'} />} />
      <Route path="/reset-password" element={<Navigate replace to={'/'} />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:eventId" element={<EventDetail />} />
      <Route path="/events/:eventId/edit" element={<EditEvent />} />
      <Route path="/events/:eventId/register" element={<RegisterForEvent />} />
      <Route
        path="/events/:eventId/draft"
        element={
          <EventOwnerRoute>
            <Draft />
          </EventOwnerRoute>
        }
      />
      <Route path="/upload" element={<Upload />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route
        path="/admin-tools"
        element={
          <AdminRoute>
            <AdminTools />
          </AdminRoute>
        }
      />
    </Routes>
  </Layout>
);
