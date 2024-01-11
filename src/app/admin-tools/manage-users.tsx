import { useState } from 'react';
import { deleteUser, UserInfoWithMetaData } from '@shared-data';
import { ConfirmPopup } from '@shared-ui';
import { toast } from 'react-toastify';
import { useListUsers } from '../../providers/queries';
import { Button, Table } from '@mui/joy';

export const ManageUsers = () => {
  const { data: users, isLoading, refetch } = useListUsers();

  const [error, setError] = useState<string>();

  const handleDeleteUser = async (user: UserInfoWithMetaData) =>
    deleteUser(user.uid)
      .then(() => {
        toast.success(`Deleted user ${user.uid}`);
        refetch();
      })
      .catch((error) => {
        console.error('Error while deleting user:', error);
        setError(error.message);
      });

  if (isLoading) return <p>Loading...</p>;
  if (!users) return <p>No users found</p>;

  return (
    <div>
      <Table borderAxis={'bothBetween'}>
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
        <Button size={'sm'} color={'danger'} onClick={() => setShow(true)}>
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
