import React, { ReactElement, useEffect, useState } from 'react';
import { UserInfo, UserInfoService } from '@shared-data';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import UserContext from '../../../userContext';

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser) as UserInfo);
    }
    setLoading(false);
  }, []);

  const updateUser = async (user: UserInfo) => {
    return UserInfoService.update(user.uid, user).then((success) => {
      if (success) login(user);
      return success;
    });
  };

  const login = (user: UserInfo) => {
    setUserInfo(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    setUserInfo(null);
    await signOut(auth);
    localStorage.removeItem('user');
  };

  const contextValue = {
    user: userInfo,
    updateUser,
    loading,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
