import { Button, Modal, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UserInfo, UserInfoService } from '@shared-data';

export const ManageUsers = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    UserInfoService.list().then((users) => setUsers(users));
  }, []);

  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const beginDelete = (uid: string) => {
    setUserId(uid);
    setShowModal(true);
  };

  const deleteUser = async () => {
    setShowModal(false);

    if (userId) await UserInfoService.delete(userId);
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Button
                  size={'sm'}
                  variant={'danger'}
                  onClick={() => beginDelete(user.uid)}
                >
                  Delete
                </Button>
              </td>
              <td>{user.name.firstName}</td>
              <td>{user.name.lastName}</td>
              <td>{user.uid}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {userId && (
        <ConfirmDelete
          onConfirm={deleteUser}
          userId={userId}
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </div>
  );
};

interface ConfirmDeleteProps {
  onConfirm: () => void;
  userId: string;
  show: boolean;
  setShow: (value: boolean) => void;
}

const ConfirmDelete = ({
  onConfirm,
  userId,
  show,
  setShow,
}: ConfirmDeleteProps) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete user {userId} and all associated uploads?
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setShow(false)}>Cancel</Button>
      <Button onClick={onConfirm}>Delete User</Button>
    </Modal.Footer>
  </Modal>
);

export default ManageUsers;
