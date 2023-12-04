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
  loading: true,
} as { isAdmin: boolean; loading: boolean });

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        await CheckAdminStatus(user.uid).then((isAdmin) => {
          if (isAdmin) setIsAdmin(true);
        });
      }
      setLoading(false);
    });
  }, []);

  const value = { isAdmin, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
