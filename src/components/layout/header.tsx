import { AppBar, IconButton, Link, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/joy';
import useAuth from '../../providers/useAuth';
import CurrentUserAvatar from './currentUserAvatar';

// TODO: Login and signup pages as modals instead?
// TODO: Or just landing pages when you open the site?

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

  return (
    <AppBar
      position="fixed"
      style={{
        height: `${height}px`,
        width: '100%',
        zIndex: 1201,
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
          sx={{ flexGrow: 1, textAlign: 'left' }}
          onClick={() => navigate('/')}
        >
          NFF
        </Link>
        {!authData.user ? (
          <Stack direction={'row'} spacing={1}>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button color={'neutral'} onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Stack>
        ) : (
          <CurrentUserAvatar />
        )}
      </Toolbar>
    </AppBar>
  );
};
