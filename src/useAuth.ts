import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { CheckAdminStatus } from '@shared-data';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        await CheckAdminStatus(user.uid).then((isAdmin) => {
          if (isAdmin) setIsAdmin(true);
        });
      }
      setUser(user);
      setLoading(false);
    });
  }, []);

  return { user, isAdmin, loading };
};

export default useAuth;
