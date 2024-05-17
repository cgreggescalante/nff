import { AppBar, IconButton, Link, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/joy';
import useAuth from '../../providers/useAuth';
import { auth } from '@shared-data';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import Box from '@mui/joy/Box';

export default ({
  height,
  persistent,
  toggleOpen,
}: {
  height: number;
  persistent: boolean;
  toggleOpen: () => void;
}) => {
  const navigate = useNavigate();
  const authData = useAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Signed out successfully');
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <AppBar
      position="fixed"
      style={{
        height: `${height}px`,
        width: '100%',
        zIndex: 1201,
        backgroundColor: '#11508e',
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
        <Link
          component={'button'}
          color={'inherit'}
          underline={'none'}
          variant={'h6'}
          sx={{ textAlign: 'left' }}
          onClick={() => navigate('/')}
        >
          NFF
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {!authData.user ? (
          <Stack direction={'row'} spacing={1}>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button color={'neutral'} onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Stack>
        ) : (
          <Button onClick={handleSignOut}>Sign Out</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
