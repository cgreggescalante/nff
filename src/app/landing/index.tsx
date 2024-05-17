import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './landing';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';

export default () => (
  <BrowserRouter basename={'/'}>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path={'/login'} element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
