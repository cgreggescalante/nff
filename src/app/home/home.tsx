import styles from './home.module.scss';
import { UploadList } from "@shared-ui";

const Home = () => (
  <div className={styles['container']}>
    <h3>Should probably put a short leaderboard up here, maybe some curated stuff?</h3>

    <UploadList />
  </div>
);

export default Home;
