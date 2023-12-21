import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export const Header = ({
  margin,
  persistent,
  toggleOpen,
}: {
  margin: number;
  persistent: boolean;
  toggleOpen: () => void;
}) => (
  <AppBar
    position="static"
    style={{
      width: `calc(100% - ${margin}px)`,
      marginLeft: `${margin}px`,
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
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);
