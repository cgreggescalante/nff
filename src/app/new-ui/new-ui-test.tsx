import { useEffect, useState } from 'react';
import { MainContent } from './main-content';
import { SideMenu } from './side-menu';
import { Header } from './header';

const drawerWidth = 100;

export const NewUiTest = () => {
  const [persistent, setPersistent] = useState(false);
  const [open, setOpen] = useState(false);

  const [margin, setMargin] = useState<number>(0);
  const [width, setWidth] = useState(0);

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
    <>
      <Header margin={margin} persistent={persistent} toggleOpen={toggleOpen} />

      <SideMenu
        open={open}
        persistent={persistent}
        width={width}
        toggleOpen={toggleOpen}
      />

      <MainContent margin={margin} />
    </>
  );
};
