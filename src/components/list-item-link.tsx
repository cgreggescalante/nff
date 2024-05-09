import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ListItemLink = ({
  path,
  name,
  onClick,
}: {
  path: string;
  name: string;
  onClick: () => void;
}) => (
  <ListItem
    sx={{ paddingBottom: 1 }}
    component={(props) => <RouterLink {...props} to={path} onClick={onClick} />}
  >
    <ListItemButton sx={{ textAlign: 'center', padding: 0, margin: 0 }}>
      <ListItemText primary={name} />
    </ListItemButton>
  </ListItem>
);
