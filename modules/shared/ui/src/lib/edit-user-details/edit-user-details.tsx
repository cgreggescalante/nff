import styles from './edit-user-details.module.scss';
import { UserInfo, UserInfoService } from "@shared-data";
import { User } from 'firebase/auth';
import { useEffect, useState } from "react";
import ManagedTextInput from "../managed-text-input/managed-text-input";
import { Button, Table } from "react-bootstrap";
import TimedAlert from "../timed-alert/timed-alert";

/* eslint-disable-next-line */
export interface EditUserDetailsProps {
  user: User,
  userInfo: UserInfo,
  refreshUser: () => void;
}

export const EditUserDetails = ({ user, userInfo, refreshUser }: EditUserDetailsProps) => {
  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);

  const [edited, setEdited] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setEdited(
      firstName !== userInfo.firstName ||
      lastName !== userInfo.lastName
    )
  }, [userInfo, firstName, lastName]);

  const saveChanges = () => {
    const newUser = new UserInfo(firstName, lastName, userInfo.uid, userInfo.role);

    new UserInfoService().setUserDetails(user.uid, newUser)
      .then(success => {
        if (success) {
          setShowAlert(true);
          setEdited(false);
          refreshUser();
        }
        else
          setError("Failed to update user details");
      });
  }

  return (
    <div className={styles['container']}>
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

      <Button disabled={!edited} onClick={saveChanges}>Save Changes</Button>

      { error && <p>{ error }</p>}

      <TimedAlert show={showAlert} setShow={setShowAlert} message={"Your profile was updated successfully"} duration={5000} />
    </div>
  );
}

export default EditUserDetails;
