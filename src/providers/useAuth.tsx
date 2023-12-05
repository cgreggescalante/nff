import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';
import { CheckAdminStatus } from '@shared-data';

const AuthContext = createContext({
  isAdmin: false,
  userId: '',
  loading: true,
} as { isAdmin: boolean; userId: string; loading: boolean });

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        await CheckAdminStatus(user.uid).then((isAdmin) => {
          if (isAdmin) setIsAdmin(true);
        });
      } else {
        setIsAdmin(false);
        setUserId('');
      }
      setLoading(false);
    });
  }, []);

  const value = { isAdmin, userId, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
