import styles from './edit-user-details.module.scss';
import { Firestore, doc, setDoc } from 'firebase/firestore';
import { UserInfo } from "@shared-data";
import { User } from 'firebase/auth';
import { useEffect, useState } from "react";
import ManagedTextInput from "../managed-text-input/managed-text-input";
import { Button, Table } from "react-bootstrap";
import TimedAlert from "../timed-alert/timed-alert";

/* eslint-disable-next-line */
export interface EditUserDetailsProps {
  user: User,
  userInfo: UserInfo,
  db: Firestore
}

export const EditUserDetails = ({ user, userInfo, db }: EditUserDetailsProps) => {
  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);

  const [edited, setEdited] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setEdited(
      firstName !== userInfo.firstName ||
      lastName !== userInfo.lastName
    )
  }, [userInfo, firstName, lastName]);

  const saveChanges = () => {
    const userRef = doc(db, "users", user.uid);
    setDoc(userRef, {
      name: {
        firstName,
        lastName
      }
    }, { merge: true }).then(_ => setShowAlert(true));
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

      <TimedAlert show={showAlert} setShow={setShowAlert} message={"Your profile was updated successfully"} duration={5000} />
    </div>
  );
}

export default EditUserDetails;
