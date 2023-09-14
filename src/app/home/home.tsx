import styles from './home.module.scss';
import { UploadList } from "@shared-ui";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { User, onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() =>
    onAuthStateChanged(auth, user => {
      if (user)
        setUser(user)
      else
        setUser(null)
    })
  )
  return (
    <div className={styles['container']}>
      <div>
        <h3>Current User</h3>
        { user?.email }
      </div>


      <UploadList />
    </div>
  );
}

export default Home;
