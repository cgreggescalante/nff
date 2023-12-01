import { UserInfo } from '@shared-data';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ManagedTextInput } from '@shared-ui';
import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface EditUserDetailsProps {
  userInfo: UserInfo;
  updateUser: (user: UserInfo) => Promise<void>;
}

export const EditUser = ({ userInfo, updateUser }: EditUserDetailsProps) => {
  const [firstName, setFirstName] = useState<string>(userInfo.name.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.name.lastName);

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(
      firstName !== userInfo.name.firstName ||
        lastName !== userInfo.name.lastName
    );
  }, [userInfo, firstName, lastName]);

  const saveChanges = () => {
    const newUser = {
      name: {
        firstName,
        lastName,
      },
      uid: userInfo.uid,
      entryRefs: userInfo.entryRefs,
    };

    updateUser(newUser)
      .then((_) => {
        toast.success('User details updated successfully');
        setEdited(false);
      })
      .catch((error) => {
        console.error('Error while updating user details:', error);
        toast.error('Failed to update user details');
      });
  };

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
