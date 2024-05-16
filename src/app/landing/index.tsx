import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './landing';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Box from '@mui/joy/Box';

export default () => (
  <Box
    m={0}
    p={0}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    height={'100vh'}
    width={'100vw'}
    sx={{
      backgroundColor: '#1976d2',
    }}
  >
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
  </Box>
);
