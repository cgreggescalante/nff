import styles from './home.module.scss';
import { UploadList } from "@shared-ui";
import { db } from "../../firebase";
import { useUser } from "../../userContext";

const Home = () => {
  const { user, loading } = useUser();

  return (
    <div className={styles['container']}>
      <div>
        <h3>Current User</h3>
        { user?.email }
      </div>

      <UploadList db={db}/>
    </div>
  );
}

export default Home;
