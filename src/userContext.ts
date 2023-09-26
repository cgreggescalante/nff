import { createContext, useContext } from "react";
import { UserInfo } from "@shared-data";

const UserContext = createContext<{ user: UserInfo | null, loading: boolean}>({ user: null, loading: true });

export const useUser = () => {
  return useContext(UserContext);
}

export default UserContext;