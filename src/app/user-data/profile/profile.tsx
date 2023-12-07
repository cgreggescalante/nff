import EditUser from './edit-user';
import useCurrentUser, { useUpdateUser } from '../../../providers/useUser';

export const Profile = () => {
  const userInfo = useCurrentUser();
  const updateUser = useUpdateUser();

  return (
    <>
      <h1>User Details</h1>

      <EditUser userInfo={userInfo} updateUser={updateUser} />
    </>
  );
};

export default Profile;
