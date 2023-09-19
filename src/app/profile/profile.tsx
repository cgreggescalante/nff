import styles from './profile.module.scss';
import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { userConverter, UserInfo } from "@shared-data";
import { doc, getDoc } from "firebase/firestore";
import { EditUserDetails, Loadable } from "@shared-ui";

/* eslint-disable-next-line */
export interface ProfileProps {}

export const Profile = (props: ProfileProps) => {
  const [user, setUser] = useState<User>();
  const [userInfo, setUserInfo ] = useState<UserInfo>()

  const getData = (): Promise<object> =>
    new Promise((resolve, reject) => onAuthStateChanged(auth, user => {
      if (user) {
        getDoc(doc(db, 'users', user.uid).withConverter(userConverter))
          .then((snapshot) => snapshot.data())
          .then(data => resolve({ user, userInfo: data }));
      }
      else
        reject();
    }));
  
  const resolve = (data: object) => {
    if ('user' in data && 'userInfo' in data) {
      setUser(data.user);
      setUserInfo(data.userInfo);
    }
  }

  return (
    <>
      <h1>User Details</h1>
      
      <Loadable getData={getData} resolve={resolve} errorMessage={"User info could not be loaded"}>
        { user && userInfo && <EditUserDetails user={user} userInfo={userInfo} db={db} /> }
      </Loadable>
    </>
  )
}

export default Profile;
