import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UserInfo, UserInfoService } from '@shared-data';
import { ConfirmDelete } from '../confirm-delete/confirm-delete';

export const ManageUsers = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const [error, setError] = useState<string>();

  useEffect(() => {
    UserInfoService.list().then((users) => setUsers(users));
  }, []);

  const deleteUser = async (user: UserInfo) => {
    UserInfoService.delete(user.uid)
      .then(() => {
        console.log('Deleted user');
        setUsers(users.filter((u) => u.uid !== user.uid));
      })
      .catch((error) => {
        console.error('Error while deleting user:', error);
        setError(error.message);
      });
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
            <UserRow
              key={index}
              user={user}
              index={index}
              deleteUser={() => deleteUser(user)}
            />
          ))}
        </tbody>
      </Table>
      {error && <p>{error}</p>}
    </div>
  );
};

interface UserRowProps {
  user: UserInfo;
  index: number;
  deleteUser: () => void;
}

const UserRow = ({ user, index, deleteUser }: UserRowProps) => {
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
      <td>{user.name.firstName}</td>
      <td>{user.name.lastName}</td>
      <td>{user.uid}</td>
      <td>{user.role}</td>
      <ConfirmDelete
        onConfirm={onConfirm}
        message={`Are you sure you want to delete user ${user.uid} and all associated uploads?
      Note that the user's identity will still exist in Firebase Authentication.`}
        show={show}
        setShow={setShow}
      />
    </tr>
  );
};

export default ManageUsers;
