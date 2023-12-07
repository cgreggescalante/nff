import EditUser from './edit-user';
import { LoadingWrapper } from '@shared-ui';
import useUser from '../../../providers/useUser';

export const Profile = () => {
  const { userInfo, isLoading, updateUser } = useUser();

  return (
    <LoadingWrapper loading={isLoading}>
      <h1>User Details</h1>

      {userInfo && <EditUser userInfo={userInfo} updateUser={updateUser} />}
    </LoadingWrapper>
  );
};

export default Profile;
