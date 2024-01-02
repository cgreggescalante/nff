import { Drawer, List } from '@mui/material';
import { ListItemLink } from './list-item-link';

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
    <ListItemLink path={'/events'} name={'Events'} onClick={toggleOpen} />
    <ListItemLink path={'/upload'} name={'Upload'} onClick={toggleOpen} />
    <ListItemLink
      path={'/user-dashboard'}
      name={'Dashboard'}
      onClick={toggleOpen}
    />
  </List>
);
