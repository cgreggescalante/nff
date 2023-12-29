import UploadList from '../components/upload-list/upload-list';
import { UserSummary } from '../user-data/user-summary';
import useUser from '../../providers/useUser';
import './home.module.scss';

const Home = () => {
  const user = useUser();

  return (
    <>
      {user && <UserSummary />}
      <UploadList />
    </>
  );
};

export default Home;
