import { useEffect, useState } from 'react';
import { listMessages, Message } from '@shared-data';
import Typography from '@mui/joy/Typography';
import { Link, Stack } from '@mui/joy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';

export default () => {
  const [message, setMessage] = useState<Message | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    listMessages().then((messages) => {
      const filtered = messages.filter(
        (message) => message.expirationDate > new Date()
      );
      setMessage(filtered[0] || null);
    });
  }, []);

  if (!message) return null;

  return (
    <Stack
      direction={'row'}
      border={'1px solid #3F612D'}
      padding={1}
      sx={{ backgroundColor: '#B2FFA9' }}
      alignItems={'center'}
    >
      <InfoOutlinedIcon />
      <Link height={'100%'} onClick={() => navigate(message.link)}>
        <Typography ml={1} level={'body-md'}>
          {message.text}
        </Typography>
      </Link>
      <Box flexGrow={1} />
      <IconButton onClick={() => setMessage(null)} size={'sm'}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};
