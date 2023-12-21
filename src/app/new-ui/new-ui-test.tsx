import { useEffect, useState } from 'react';
import { MainContent } from './main-content';
import { SideMenu } from './side-menu';
import { Header } from './header';
import { BrowserRouter } from 'react-router-dom';

const drawerWidth = 150;
const headerHeight = 57;

export const NewUiTest = () => {
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

      <MainContent margin={margin} headerHeight={headerHeight} />
    </BrowserRouter>
  );
};
