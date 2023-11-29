import { Button, Modal } from 'react-bootstrap';

interface ConfirmDeleteProps {
  onConfirm: () => void;
  message: string;
  show: boolean;
  setShow: (value: boolean) => void;
}

export const ConfirmDelete = ({
  onConfirm,
  message,
  show,
  setShow,
}: ConfirmDeleteProps) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setShow(false)}>Cancel</Button>
      <Button variant={'danger'} onClick={onConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);
