import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import {
  auth,
  readUser,
  updateUser,
  UserInfo,
  UserInfoWithMetaData,
} from '@shared-data';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const UserContext = createContext<{
  userInfo: UserInfoWithMetaData | undefined;
  updateUser: (user: UserInfo) => Promise<void>;
}>({
  userInfo: undefined,
  updateUser: () => new Promise<void>((_) => null),
});

export const useCurrentUser = (): UserInfoWithMetaData => {
  const context = useContext(UserContext);
  if (!context.userInfo) {
    throw new Error('useCurrentUserContext must be used within a UserProvider');
  }
  return context.userInfo;
};

export const useUpdateUser = () => {
  const { updateUser } = useContext(UserContext);
  return updateUser;
};

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: () => readUser(auth.currentUser?.uid || ''),
  });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userInfo, isLoading } = useCurrentUserQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      await queryClient.refetchQueries({ queryKey: ['currentUser'] });
    });
  }, [queryClient]);

  const handleUpdateUser = async (user: UserInfo) => {
    if (!userInfo) return Promise.reject('User not logged in');
    return updateUser(userInfo.uid, user)
      .then((_) => queryClient.refetchQueries({ queryKey: ['currentUser'] }))
      .catch((error) => Promise.reject(error));
  };

  if (isLoading) {
    return <div>Loading User Info</div>;
  }

  if (!userInfo) {
    return <div>Not logged in</div>;
  }

  const contextValue = {
    userInfo,
    updateUser: handleUpdateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default useCurrentUser;
