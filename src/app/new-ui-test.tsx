import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../providers/useUser';
import Home from './home/home';
import Signup from './auth-pages/signup/signup';
import Login from './auth-pages/login/login';
import EventList from './event/event-list/event-list';
import EventDetail from './event/event-detail/event-detail';
import { EditEvent } from './event/event-detail/edit-event';
import ProtectedRoute from './components/routes/protected-route';
import Profile from './user-data/profile/profile';
import UserDashboard from './user-data/user-dashboard';
import { AdminRoute } from './components/routes/admin-route';
import AdminTools from './admin-tools/admin-tools';
import Upload from './upload/upload';
import { Menu } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const NewUiTest = () => {
  return (
    <div>
      <FormatWithContent />
    </div>
  );
};

const drawerWidth = 100;

const FormatWithContent = () => {
  const [persistent, setPersistent] = useState(false);
  const [open, setOpen] = useState(false);

  const [margin, setMargin] = useState<number>(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onResize = () => {
      const persistent = window.innerWidth > 768;
      setPersistent(persistent);
      if (persistent) {
        setMargin(drawerWidth);
        setWidth(drawerWidth);
        setOpen(false);
      } else if (open) setWidth(drawerWidth);
      else setMargin(0);
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const toggleOpen = () => {
    const newOpen = !open;
    setOpen(newOpen);
    if (persistent) {
      setMargin(drawerWidth);
      setWidth(drawerWidth);
    } else if (newOpen) setWidth(drawerWidth);
    else setMargin(0);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          width: `100% -${margin}px`,
          marginLeft: `${margin}px`,
        }}
      >
        <Toolbar>
          {!persistent && (
            <IconButton
              onClick={toggleOpen}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open || persistent}
        variant={persistent ? 'persistent' : 'temporary'}
        sx={{
          width: `${width}px`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: `${width}px`,
            boxSizing: 'border-box',
          },
        }}
      >
        {!persistent && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton onClick={toggleOpen}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )}
        <List>
          <ListItem>
            <ListItemText>Item1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Item2</ListItemText>
          </ListItem>
        </List>
      </Drawer>

      <MainContent margin={margin} />
    </>
  );
};

const MainContent = ({ margin }: { margin: number }) => (
  <div style={{ width: `100% - ${margin}px`, marginLeft: `${margin}px` }}>
    <BrowserRouter basename={'/'}>
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
    </BrowserRouter>
  </div>
);
