import styles from './admin-tools.module.scss';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { UserInfo } from "@shared-data";
import { collection, getDocs, query } from "firebase/firestore";
import { Table } from "react-bootstrap";

/* eslint-disable-next-line */
export interface AdminToolsProps {}

export const AdminTools = (props: AdminToolsProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, user => user?.uid === "hi1zLi5QJNgaoZc1NHDg04zFDQV2" ? setAuthenticated(true) : setAuthenticated(false))
  });

  useEffect(() => {
    if (authenticated) {
      getDocs(query(
        collection(db, "users").withConverter(UserInfo.converter)
      ))
        .then(snapshot => {
          const users = snapshot.docs.map(doc => doc.data());

          setUsers(users);
        })
    }
  }, [authenticated]);

  return <div className={styles['container']}>
    <h1>Welcome to AdminTools!</h1>

    {
      authenticated ? <>
        <Table bordered>
          <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UID</th>
          </tr>
          </thead>
          <tbody>
          {
            users.map(user => <tr>
                <td>{ user.email }</td>
                <td>{ user.firstName }</td>
                <td>{ user.lastName }</td>
                <td>{ user.id }</td>
            </tr>
            )
          }
          </tbody>
        </Table>

      </> : <h3>No user authenticated, please login and try again.</h3>
    }
  </div>
}

export default AdminTools;
