import React, { ReactElement, useEffect, useState } from "react";
import { auth } from "../../firebase";
import UserContext from "../../userContext"
import { UserInfo, UserInfoService } from "@shared-data";

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userInfo = await new UserInfoService().getById(firebaseUser.uid);

        setUser(userInfo);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
