import { Button, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Layout from './layout';

export default () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Typography level={'h1'}>Fantasy Fitness</Typography>

      <Typography>Highland Park's summer training game</Typography>

      <Box mt={5}>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/register')} sx={{ ml: 2 }}>
          Register
        </Button>
      </Box>
    </Layout>
  );
};
