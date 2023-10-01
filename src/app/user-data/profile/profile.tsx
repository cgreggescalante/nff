import { EditUserDetails } from './edit-user-details/edit-user-details';
import { useUser } from '../../../userContext';
import LoadingWrapper from '../../components/loading-wrapper/loading-wrapper';

export const Profile = () => {
  const { user, loading, updateUser } = useUser();

  return (
    <LoadingWrapper loading={loading}>
      <h1>User Details</h1>

      {user && <EditUserDetails userInfo={user} updateUser={updateUser} />}
    </LoadingWrapper>
  );
};

export default Profile;
