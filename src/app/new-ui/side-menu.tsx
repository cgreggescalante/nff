import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const SideMenu = ({
  headerHeight,
  open,
  persistent,
  width,
  toggleOpen,
}: {
  headerHeight: number;
  open: boolean;
  persistent: boolean;
  width: number;
  toggleOpen: () => void;
}) => (
  <Drawer
    open={open || persistent}
    variant={persistent ? 'permanent' : 'temporary'}
    sx={{
      width: `${width}px`,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: width,
        marginTop: `${headerHeight}px`,
        boxSizing: 'border-box',
      },
    }}
  >
    <DrawerContent toggleOpen={toggleOpen} />
  </Drawer>
);

const DrawerContent = ({ toggleOpen }: { toggleOpen: () => void }) => (
  <List>
    <FunctionalRouter
      path={'/events'}
      name={'Events'}
      toggleOpen={toggleOpen}
    />
    <FunctionalRouter
      path={'/upload'}
      name={'Upload'}
      toggleOpen={toggleOpen}
    />
    <FunctionalRouter
      path={'/user-dashboard'}
      name={'Dashboard'}
      toggleOpen={toggleOpen}
    />
  </List>
);

const FunctionalRouter = ({
  path,
  name,
  toggleOpen,
}: {
  path: string;
  name: string;
  toggleOpen: () => void;
}) => (
  <ListItem
    component={(props) => (
      <RouterLink {...props} to={path} onClick={toggleOpen} />
    )}
  >
    <ListItemButton sx={{ textAlign: 'center' }}>
      <ListItemText>{name}</ListItemText>
    </ListItemButton>
  </ListItem>
);
