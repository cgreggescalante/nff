import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import RegisterForEvent from './eventDetail/registerForEvent';
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
      <Route path="/events/:eventId/register" element={<RegisterForEvent />} />
      <Route path="/leaderboard" element={<AllEventLeaderboard />} />
      <Route path="/add-activity" element={<AddActivity />} />
    </Routes>
  </Layout>
);
