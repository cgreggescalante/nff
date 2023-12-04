import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { readUser, updateUser, UserInfo } from '@shared-data';
import { auth } from '../firebase';

const UserContext = createContext<{
  user: UserInfo | null;
  updateUser: (user: UserInfo) => Promise<void>;
  loading: boolean;
}>({
  user: null,
  updateUser: () => new Promise<void>((_) => null),
  loading: true,
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!userInfo || reload) {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userInfo = await readUser(user.uid);
          if (userInfo) {
            setUserInfo(userInfo);
          }
        }
        setReload(false);
        setLoading(false);
      });
    }
  }, [reload, userInfo]);

  const handleUpdateUser = async (user: UserInfo) => {
    return updateUser(user.uid, user)
      .then((_) => setReload(true))
      .catch((error) => Promise.reject(error));
  };

  const contextValue = {
    user: userInfo,
    updateUser: handleUpdateUser,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default useUser;
