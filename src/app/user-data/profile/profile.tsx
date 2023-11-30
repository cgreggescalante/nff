import { EditUser } from './edit-user/edit-user';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';
import useUser from '../../../providers/useUser';

export const Profile = () => {
  const { user, loading, updateUser } = useUser();

  return (
    <LoadingWrapper loading={loading}>
      <h1>User Details</h1>

      {user && <EditUser userInfo={user} updateUser={updateUser} />}
    </LoadingWrapper>
  );
};

export default Profile;
