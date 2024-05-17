import { ReactNode } from 'react';
import { Card, CardContent, CardCover } from '@mui/joy';
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
      size={'lg'}
      sx={{
        height: 275,
        width: 'auto',
        maxWidth: 'min(90%, 450px)',
        ml: 2,
        mr: 2,
        flexGrow: 1,
      }}
    >
      <CardCover>
        <img alt={'Runner having lots of fun'} src={'DSC_0058.JPG'} />
      </CardCover>
      <CardCover
        sx={{
          background: 'rgba(255,255,255,.9)',
        }}
      />
      <CardContent
        sx={{
          alignItems: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </CardContent>
    </Card>
  </Box>
);
