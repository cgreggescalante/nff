import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { auth } from "../../firebase";
import UserContext from "../../userContext"
import { UserInfo, UserInfoService } from "@shared-data";
import { User } from "firebase/auth";

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [userInfoService] = useState(new UserInfoService());
  
  const refreshUser = useCallback(async (fbu?: User | null) => {
    if (fbu === null || fbu === undefined)
      fbu = firebaseUser;
    if (fbu) {
      const userInfo = await userInfoService.getById(fbu.uid);
      setUser(userInfo);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [firebaseUser, userInfoService]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      await refreshUser(firebaseUser);
      setFirebaseUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [refreshUser]);

  const contextValue = {
    user,
    loading,
    refreshUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
