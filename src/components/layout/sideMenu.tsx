import { Drawer, List } from '@mui/material';
import ListItemLink from './listItemLink';
import { Divider } from '@mui/joy';

export default ({
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
    <ListItemLink path={'/'} name={'Activity Feed'} onClick={toggleOpen} />
    <ListItemLink path={'/events'} name={'Events'} onClick={toggleOpen} />
    <ListItemLink
      path={'/add-activity'}
      name={'Add Activity'}
      onClick={toggleOpen}
    />
    <ListItemLink
      path={'/leaderboard'}
      name={'Leaderboard'}
      onClick={toggleOpen}
    />
    <Divider />
    <ListItemLink path={'/about'} name={'About'} onClick={toggleOpen} />
  </List>
);
