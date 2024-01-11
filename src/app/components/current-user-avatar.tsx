import useUser from '../../providers/useUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@shared-data';
import { toast } from 'react-toastify';
import { Avatar, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemLink } from './list-item-link';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const CurrentUserAvatar = () => {
  const user = useUser();
  const navigate = useNavigate();

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
  const id = open ? 'simpe-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleAvatarClick}>
        <Avatar
          sx={{
            bgcolor: stringToColor(user.firstName + ' ' + user.lastName),
          }}
          children={`${user.firstName[0]}${user.lastName[0]}`}
        />
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
        <List disablePadding>
          <ListItemLink
            path={'/edit-profile'}
            name={'Edit Profile'}
            onClick={() => null}
          />
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
