import { User } from 'firebase/auth';
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
  user: null,
  isAdmin: false,
  loading: true,
} as { user: User | null; isAdmin: boolean; loading: boolean });

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const value = { user, isAdmin, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
