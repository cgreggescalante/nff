import { UserSummary } from '../user-data/user-summary';
import useUser from '../../providers/useUser';
import './home.module.scss';
import { UploadList } from '../components';

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
