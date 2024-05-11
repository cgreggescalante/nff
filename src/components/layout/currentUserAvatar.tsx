import { useNavigate } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Avatar } from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/joy';
import useAuth from '../../providers/useAuth';
import ListItemLink from './listItemLink';

export default () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [avatarEl, setAvatarEl] = useState<HTMLButtonElement | null>(null);

  const handleAvatarClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Signed out successfully');
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  const open = Boolean(avatarEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleAvatarClick}
        sx={{ backgroundColor: 'transparent' }}
      >
        <Avatar sx={{ backgroundColor: '#B8D8D8' }}>
          <h3>{user?.displayName ? user.displayName[0] : 'U'}</h3>
        </Avatar>
        <KeyboardArrowDownIcon color={'action'} />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List disablePadding sx={{ p: 0 }}>
          <ListItem>
            <ListItemButton onClick={handleSignOut}>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};
