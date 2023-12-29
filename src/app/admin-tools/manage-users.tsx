import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { deleteUser, listUsers, UserInfoWithMetaData } from '@shared-data';
import { ConfirmPopup } from '@shared-ui';
import { toast } from 'react-toastify';

export const ManageUsers = () => {
  // TODO: use query
  const [users, setUsers] = useState<UserInfoWithMetaData[]>([]);

  const [error, setError] = useState<string>();

  useEffect(() => {
    listUsers().then((users) => setUsers(users));
  }, []);

  const handleDeleteUser = async (user: UserInfoWithMetaData) =>
    deleteUser(user.uid)
      .then(() => {
        toast.success(`Deleted user ${user.uid}`);
        setUsers(users.filter((u) => u.uid !== user.uid));
      })
      .catch((error) => {
        console.error('Error while deleting user:', error);
        setError(error.message);
      });

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow
              key={index}
              user={user}
              deleteUser={() => handleDeleteUser(user)}
            />
          ))}
        </tbody>
      </Table>
      {error && <p>{error}</p>}
    </div>
  );
};

interface UserRowProps {
  user: UserInfoWithMetaData;
  deleteUser: () => void;
}

const UserRow = ({ user, deleteUser }: UserRowProps) => {
  const [show, setShow] = useState<boolean>(false);

  const onConfirm = () => {
    setShow(false);
    deleteUser();
  };

  return (
    <tr>
      <td>
        <Button size={'sm'} variant={'danger'} onClick={() => setShow(true)}>
          Delete
        </Button>
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.uid}</td>
      <ConfirmPopup
        onConfirm={onConfirm}
        message={`Are you sure you want to delete user ${user.uid} and all associated uploads?
      Note that the user's identity will still exist in Firebase Authentication.`}
        show={show}
        setShow={setShow}
        action={'Delete'}
      />
    </tr>
  );
};

export default ManageUsers;
