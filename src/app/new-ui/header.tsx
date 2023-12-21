import { AppBar, Button, IconButton, Link, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../providers/useAuth';
import { UserProvider } from '../../providers/useUser';
import { CurrentUserAvatar } from './current-user-avatar';

export const Header = ({
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
        {!authData.userId ? (
          <>
            <LinkContainer to="/login">
              <Button color={'inherit'}>Login</Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Button color={'inherit'}>Sign Up</Button>
            </LinkContainer>
          </>
        ) : (
          <UserProvider>
            <CurrentUserAvatar />
          </UserProvider>
        )}
      </Toolbar>
    </AppBar>
  );
};
