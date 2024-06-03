import { Navigate, Route, Routes } from 'react-router-dom';
import { EventOwnerRoute, Layout } from '../components';
import Draft from './eventDetail/draft';
import RegisterForEvent from './eventDetail/registerForEvent';
import EditEvent from './eventDetail/editEvent';
import Home from './home';
import EventList from './eventList';
import EventDetail from './eventDetail';
import AddActivity from './addActivity';
import AllEventLeaderboard from './allEventLeaderboard';
import About from './about';

export default () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Navigate replace to={'/'} />} />
      <Route path="/login" element={<Navigate replace to={'/'} />} />
      <Route path="/forgot-password" element={<Navigate replace to={'/'} />} />
      <Route path="/reset-password" element={<Navigate replace to={'/'} />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:eventId" element={<EventDetail />} />
      <Route path="/events/:eventId/edit" element={<EditEvent />} />
      <Route path="/events/:eventId/register" element={<RegisterForEvent />} />
      <Route path="/leaderboard" element={<AllEventLeaderboard />} />
      <Route
        path="/events/:eventId/draft"
        element={
          <EventOwnerRoute>
            <Draft />
          </EventOwnerRoute>
        }
      />
      <Route path="/add-activity" element={<AddActivity />} />
    </Routes>
  </Layout>
);
