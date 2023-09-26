import React, { ReactElement, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import UserContext from "../../userContext"
import { UserInfo } from "@shared-data";

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // If user is signed in, get their document from the users collection
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid).withConverter(UserInfo.converter));
          if (userDoc.exists()) {
            const userInfo = userDoc.data();
            userInfo.id = firebaseUser.uid;
            setUser(userInfo);
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
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
