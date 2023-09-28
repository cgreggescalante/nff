import { createContext, useContext } from "react";
import { UserInfo } from "@shared-data";

const UserContext = createContext<{ user: UserInfo | null, loading: boolean, refreshUser: () => void}>({ user: null, loading: true, refreshUser: () => null });

export const useUser = () => {
  return useContext(UserContext);
}

export default UserContext;