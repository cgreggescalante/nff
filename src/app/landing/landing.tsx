import {
  AspectRatio,
  Button,
  Card,
  CardOverflow,
  Stack,
  Typography,
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';

const images = ['DSC_0058.JPG'];

export default () => {
  const navigate = useNavigate();

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <Card
      orientation={'horizontal'}
      variant={'outlined'}
      size={'lg'}
      sx={{
        height: 275,
        width: 'auto',
        maxWidth: 'min(90%, 500px)',
        ml: 2,
        mr: 2,
        flexGrow: 1,
      }}
    >
      <Stack
        alignItems={'center'}
        height={'100%'}
        justifyContent={'space-between'}
      >
        <Typography level={'h1'}>Fantasy Fitness</Typography>

        <Typography>Highland Park's summer training game</Typography>

        <Box>
          <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
            Login
          </Button>
          <Button onClick={() => navigate('/register')} sx={{ mt: 2, ml: 1 }}>
            Register
          </Button>
        </Box>
      </Stack>

      <CardOverflow>
        <AspectRatio ratio={1} sx={{ width: 323 }}>
          <img alt={'Runner having lots of fun'} src={randomImage} />
        </AspectRatio>
      </CardOverflow>
    </Card>
  );
};
