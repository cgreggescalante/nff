import styles from './profile.module.scss';
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { userConverter, UserInfo } from "@shared-data";
import { doc, getDoc } from "firebase/firestore";
import { EditUserDetails } from "@shared-ui";

/* eslint-disable-next-line */
export interface ProfileProps {}

export const Profile = (props: ProfileProps) => {
  const [user, setUser] = useState<User>();
  const [userInfo, setUserInfo ] = useState<UserInfo>()
  
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() =>
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        getDoc(doc(db, 'users', user.uid).withConverter(userConverter))
          .then((snapshot) => snapshot.data())
          .then((data) => {
            setUserInfo(data);
            setLoading(false);
          });
      }
      else
        navigate('/nff/login');
    })
  );

  return (
    <div className={styles['container']}>
      <h1>User Details</h1>
      {
        loading ? <h3>Loading...</h3> : <>
          {
            user && userInfo ? <EditUserDetails user={user} userInfo={userInfo} db={db} /> :
              <h3>User info could not be loaded :(</h3>
          }
        </>
      }
    </div>
  )
}

export default Profile;
