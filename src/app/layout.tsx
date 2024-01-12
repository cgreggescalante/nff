import { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import { SideMenu } from './components/side-menu';
import Box from '@mui/joy/Box';

const drawerWidth = 150;
const headerHeight = 60;

export const Layout = ({ children }: { children: ReactNode }) => {
  const [persistent, setPersistent] = useState(window.innerWidth > 768);
  const [open, setOpen] = useState(window.innerWidth > 768);

  const [margin, setMargin] = useState<number>(
    window.innerWidth > 768 ? drawerWidth : 0
  );
  const [width, setWidth] = useState(drawerWidth);

  useEffect(() => {
    const onResize = () => updateMeasures(open, window.innerWidth > 768);

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const toggleOpen = () => updateMeasures(!open, persistent);

  const updateMeasures = (open: boolean, persistent: boolean) => {
    setOpen(open);
    setPersistent(persistent);
    if (persistent) {
      setMargin(drawerWidth);
      setWidth(drawerWidth);
      setOpen(false);
    } else if (open) setWidth(drawerWidth);
    else setMargin(0);
  };

  return (
    <BrowserRouter basename={'/'}>
      <Header
        height={headerHeight}
        persistent={persistent}
        toggleOpen={toggleOpen}
      />

      <SideMenu
        headerHeight={headerHeight}
        open={open}
        persistent={persistent}
        width={width}
        toggleOpen={toggleOpen}
      />

      <Box
        style={{
          width: `100% - ${margin}px`,
          maxWidth: 800,
          marginLeft: `${margin}px`,
          marginTop: headerHeight,
        }}
        sx={{ p: 4 }}
      >
        {children}
      </Box>
    </BrowserRouter>
  );
};
