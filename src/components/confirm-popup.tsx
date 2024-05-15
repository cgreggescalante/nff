import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Stack,
} from '@mui/joy';

interface ConfirmPopupProps {
  onConfirm: () => void;
  message: string;
  show: boolean;
  setShow: (value: boolean) => void;
  action: 'Delete' | 'Confirm';
}

export const ConfirmPopup = ({
  onConfirm,
  message,
  show,
  setShow,
  action,
}: ConfirmPopupProps) => (
  <Modal open={show} onClose={() => setShow(false)}>
    <ModalDialog>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => setShow(false)}>Cancel</Button>
        <Button
          color={action === 'Delete' ? 'danger' : 'success'}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Stack>
    </ModalDialog>
  </Modal>
);
