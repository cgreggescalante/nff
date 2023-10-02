import { createContext, useContext } from 'react';
import { UserInfo } from '@shared-data';

const UserContext = createContext<{
  user: UserInfo | null;
  updateUser: (user: UserInfo) => Promise<void>;
  loading: boolean;
  login: (user: UserInfo) => void;
  logout: () => Promise<void>;
}>({
  user: null,
  updateUser: () => new Promise<void>((_) => null),
  loading: true,
  login: (_: UserInfo) => null,
  logout: () => new Promise<void>(() => null),
});

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
