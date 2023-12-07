import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  auth,
  readUser,
  updateUser,
  UserInfo,
  UserInfoWithMetaData,
} from '@shared-data';
import { useQuery, useQueryClient } from 'react-query';

const UserContext = createContext<{
  userInfo: UserInfoWithMetaData | undefined;
  updateUser: (user: UserInfo) => Promise<void>;
  isLoading: boolean;
}>({
  userInfo: undefined,
  updateUser: () => new Promise<void>((_) => null),
  isLoading: true,
});

export const useUser = () => {
  return useContext(UserContext);
};

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: 'currentUser',
    queryFn: () => readUser(auth.currentUser?.uid || ''),
  });

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const { data: userInfo, isLoading } = useCurrentUserQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      await queryClient.invalidateQueries('currentUser');
    });
  }, [queryClient]);

  const handleUpdateUser = async (user: UserInfo) => {
    if (!userInfo) return Promise.reject('User not logged in');
    return updateUser(userInfo.uid, user)
      .then((_) => queryClient.invalidateQueries('currentUser'))
      .catch((error) => Promise.reject(error));
  };

  const contextValue = {
    userInfo,
    updateUser: handleUpdateUser,
    isLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default useUser;
