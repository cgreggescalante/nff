import { useEffect, useState } from 'react';
import { ManagedTextInput } from '@shared-ui';
import { toast } from 'react-toastify';
import useCurrentUser, { useUpdateUser } from '../../../providers/useUser';
import { Button, Table } from '@mui/material';

export const EditUser = () => {
  const userInfo = useCurrentUser();
  const updateUser = useUpdateUser();

  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(
      firstName !== userInfo.firstName || lastName !== userInfo.lastName
    );
  }, [userInfo, firstName, lastName]);

  const saveChanges = () =>
    updateUser({
      firstName,
      lastName,
    })
      .then((_) => {
        toast.success('User details updated successfully');
        setEdited(false);
      })
      .catch((error) => {
        console.error('Error while updating user details:', error);
        toast.error('Failed to update user details');
      });

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              <ManagedTextInput value={firstName} setValue={setFirstName} />
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <ManagedTextInput value={lastName} setValue={setLastName} />
            </td>
          </tr>
        </tbody>
      </Table>

      <Button disabled={!edited} onClick={saveChanges}>
        Save Changes
      </Button>
    </>
  );
};

export default EditUser;
