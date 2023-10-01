import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase';
import { EditUserDetails } from './edit-user-details/edit-user-details';
import { useUser } from '../../userContext';

export const Profile = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const { user, loading, refreshUser } = useUser();

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      setFirebaseUser(firebaseUser);
    });
  }, []);

  useEffect(() => {
    if (!loading && user === null) {
      console.log('refreshing');
      refreshUser();
    }
  }, [loading]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <>
      <h1>User Details</h1>

      {firebaseUser && user && (
        <EditUserDetails
          user={firebaseUser}
          userInfo={user}
          refreshUser={refreshUser}
        />
      )}
    </>
  );
};

export default Profile;
