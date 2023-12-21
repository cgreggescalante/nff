import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const SideMenu = ({
  open,
  persistent,
  width,
  toggleOpen,
}: {
  open: boolean;
  persistent: boolean;
  width: number;
  toggleOpen: () => void;
}) => (
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
);
