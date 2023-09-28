import styles from './admin-tools.module.scss';
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { UserInfo, UserInfoConverter } from "@shared-data";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Button, Modal, Table } from "react-bootstrap";
import { useUser } from "../../userContext";
import { useNavigate } from "react-router-dom";

export const AdminTools = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const { user, loading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin'))
      navigate("/")
  }, [user, navigate, loading]);

  useEffect(() => {
    getDocs(query(
      collection(db, "users").withConverter(UserInfoConverter)
    ))
      .then(snapshot => {
        const users = snapshot.docs.map(doc => doc.data());

        setUsers(users);
      })
  }, []);

  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const beginDelete = (uid: string) => {
    setUserId(uid);
    setShowModal(true);
  }

  const deleteUser = async () => {
    setShowModal(false);

    if (userId) {
      const userRef = doc(db, "users", userId);

      await deleteDoc(userRef);

      getDocs(query(
        collection(db, "uploads"),
        where("user", "==", userRef)
      ))
        .then(docs => {
          docs.forEach(doc => deleteDoc(doc.ref));
        })
    }
  }

  return <div className={styles['container']}>
    <h1>Welcome to AdminTools!</h1>
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
      {
        users.map(user => <tr>
            <td><Button onClick={() => beginDelete(user.uid)}>Delete</Button></td>
            <td>{ user.firstName }</td>
            <td>{ user.lastName }</td>
            <td>{ user.uid }</td>
        </tr>
        )
      }
      </tbody>
    </Table>
    {
      userId && <ConfirmDelete onConfirm={deleteUser} userId={userId} show={showModal} setShow={setShowModal} />
    }
  </div>
}

interface ConfirmDeleteProps {
  onConfirm: () => void,
  userId: string,
  show: boolean,
  setShow: (value: boolean) => void
}

const ConfirmDelete = ({ onConfirm, userId, show, setShow }: ConfirmDeleteProps) =>
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete User</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete user { userId } and all associated uploads?</Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setShow(false)}>Cancel</Button>
      <Button onClick={onConfirm}>Delete User</Button>
    </Modal.Footer>
  </Modal>

export default AdminTools;
