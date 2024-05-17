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

      <Box sx={{ flexGrow: 1 }} />

      <Box mb={3}>
        <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Login
        </Button>
        <Button onClick={() => navigate('/register')} sx={{ mt: 2, ml: 2 }}>
          Register
        </Button>
      </Box>
    </Layout>
  );
};
