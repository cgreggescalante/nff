import styles from './home.module.scss';
import { UploadList } from "@shared-ui";
import { db } from "../../firebase";
import { useUser } from "../../userContext";

const Home = () => {
  const { user, loading } = useUser();

  return (
    <div className={styles['container']}>
      <div>
        { loading ? <h3>Loading...</h3> : user ? <>
          <h3>Current User</h3>
          { user.uid } { user.firstName } { user.lastName } { user.role }
        </>
          : <h3>No Current User</h3>
        }
      </div>

      <UploadList db={db}/>
    </div>
  );
}

export default Home;
