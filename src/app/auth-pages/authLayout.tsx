import { ReactNode } from 'react';
import Box from '@mui/joy/Box';

export default ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      {children}
    </Box>
  );
};
