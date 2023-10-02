import { UserInfo } from '@shared-data';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ManagedTextInput from '../../../components/managed-text-input/managed-text-input';
import TimedAlert from '../../../components/timed-alert/timed-alert';

/* eslint-disable-next-line */
export interface EditUserDetailsProps {
  userInfo: UserInfo;
  updateUser: (user: UserInfo) => Promise<void>;
}

export const EditUserDetails = ({
  userInfo,
  updateUser,
}: EditUserDetailsProps) => {
  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);

  const [edited, setEdited] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setEdited(
      firstName !== userInfo.firstName || lastName !== userInfo.lastName
    );
  }, [userInfo, firstName, lastName]);

  const saveChanges = () => {
    const newUser = new UserInfo(
      firstName,
      lastName,
      userInfo.uid,
      userInfo.role,
      userInfo.totalPoints
    );

    updateUser(newUser)
      .then((_) => {
        setShowAlert(true);
        setEdited(false);
      })
      .catch((error) => {
        console.error('Error while updating user details:', error);
        setError('Failed to update user details');
      });
  };

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <td> First Name </td>
            <td>
              <ManagedTextInput value={firstName} setValue={setFirstName} />
            </td>
          </tr>
          <tr>
            <td> Last Name </td>
            <td>
              <ManagedTextInput value={lastName} setValue={setLastName} />
            </td>
          </tr>
        </tbody>
      </Table>

      <Button disabled={!edited} onClick={saveChanges}>
        Save Changes
      </Button>

      {error && <p>{error}</p>}

      <TimedAlert
        show={showAlert}
        setShow={setShowAlert}
        message={'Your profile was updated successfully'}
        duration={5000}
      />
    </>
  );
};

export default EditUserDetails;
