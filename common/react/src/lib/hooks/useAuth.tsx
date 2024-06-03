import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, CheckAdminStatus } from '@shared-data';
import { User } from 'firebase/auth';

const AuthContext = createContext({
  isAdmin: false,
  user: null,
  loading: true,
} as { isAdmin: boolean; user: User | null; loading: boolean });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await CheckAdminStatus(user.uid).then((isAdmin) => {
          if (isAdmin) setIsAdmin(true);
        });
      } else {
        setIsAdmin(false);
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
