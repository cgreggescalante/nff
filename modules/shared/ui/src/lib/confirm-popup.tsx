import { Button, Modal } from 'react-bootstrap';

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
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Action</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setShow(false)}>Cancel</Button>
      <Button
        variant={action === 'Delete' ? 'danger' : 'success'}
        onClick={onConfirm}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);
