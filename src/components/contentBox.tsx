import { ReactNode } from 'react';
import Box from '@mui/joy/Box';

export default ({
  maxWidth,
  children,
}: {
  maxWidth: number;
  children: ReactNode;
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <Box
      sx={{
        width: 'auto',
        maxWidth,
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  </Box>
);
