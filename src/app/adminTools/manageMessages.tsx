import { useEffect, useMemo, useState } from 'react';
import { createMessage, listMessages, MessageWithMetadata } from '@shared-data';
import { AgGridReact } from 'ag-grid-react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Typography,
} from '@mui/joy';
import { toast } from 'react-toastify';

export default () => {
  const [messages, setMessages] = useState<MessageWithMetadata[]>([]);

  const [message, setMessage] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    listMessages().then(setMessages);
  }, []);

  const colDefs = useMemo(
    () =>
      [
        { field: 'text', headerName: 'Message', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'expirationDate', headerName: 'Expiration Date', flex: 1 },
        { field: 'link', headerName: 'Link', flex: 1 },
      ] as any[],
    []
  );

  const handleSubmit = () => {
    const newMessage = {
      text: message,
      expirationDate: new Date(expirationDate),
      link,
    };

    createMessage(newMessage).then(() => {
      listMessages().then(setMessages);
      setMessage('');
      setExpirationDate('');
      setLink('');
      toast.success('Message added successfully');
    });
  };

  return (
    <>
      <Typography level={'h2'}>Add Message</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 1 }}>
          <FormLabel>Message Text</FormLabel>
          <Textarea
            minRows={2}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Expiration Date</FormLabel>
          <Input
            type={'date'}
            required
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Link</FormLabel>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </FormControl>

        <Button sx={{ marginTop: 1, marginBottom: 2 }} type={'submit'}>
          Add Message
        </Button>
      </form>
      <div className="ag-theme-quartz">
        <AgGridReact
          domLayout={'autoHeight'}
          rowData={messages}
          columnDefs={colDefs}
          autoSizeStrategy={{ type: 'fitCellContents' }}
        />
      </div>
    </>
  );
};
