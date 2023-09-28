import styles from './admin-tools.module.scss';
import { useEffect, useState } from "react";
import { UserInfo, UserInfoService } from "@shared-data";
import { Button, Modal, Table } from "react-bootstrap";
import { useUser } from "../../userContext";
import { useNavigate } from "react-router-dom";

export const AdminTools = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const { user, loading, refreshUser } = useUser();

  const navigate = useNavigate();

  const [userInfoService] = useState(new UserInfoService());
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    if (!loading && !user)
      refreshUser();
    else if (!loading && (!user || user.role !== 'admin')) {
      console.log(user, user?.role)
      navigate("/");
    }
    
    if (!loading && user?.role === "admin")
      setAuthenticated(true);

  }, [user, navigate, loading, refreshUser]);

  useEffect(() => {
    if (authenticated) {
      userInfoService.getUsers()
        .then(users => setUsers(users));
    }
  }, [authenticated, userInfoService]);

  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const beginDelete = (uid: string) => {
    setUserId(uid);
    setShowModal(true);
  }

  const deleteUser = async () => {
    setShowModal(false);

    if (userId)
      await userInfoService.delete(userId);
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
        <th>Role</th>
      </tr>
      </thead>
      <tbody>
      {
        users.map((user, index) => <tr key={index}>
            <td><Button onClick={() => beginDelete(user.uid)}>Delete</Button></td>
            <td>{ user.firstName }</td>
            <td>{ user.lastName }</td>
            <td>{ user.uid }</td>
            <td>{ user.role }</td>
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
