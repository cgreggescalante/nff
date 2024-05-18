import { ReactNode } from 'react';
import { Card, CardContent } from '@mui/joy';
import Box from '@mui/joy/Box';

export default ({ children }: { children: ReactNode }) => (
  <Box
    m={0}
    p={0}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    height={'100vh'}
    width={'100vw'}
    sx={{
      backgroundColor: '#11508e',
    }}
  >
    <Card
      orientation={'horizontal'}
      size={'md'}
      sx={{
        height: 275,
        width: 'auto',
        maxWidth: 'min(90%, 450px)',
        ml: 2,
        mr: 2,
        flexGrow: 1,
      }}
    >
      <CardContent
        sx={{
          alignItems: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </CardContent>
    </Card>
  </Box>
);
