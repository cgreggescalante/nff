import { ReactNode, useState } from 'react';
import { auth } from '../../../firebase';
import { CheckAdminStatus } from '@shared-data';
import { useNavigate } from 'react-router-dom';

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps): ReactNode => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  auth.onAuthStateChanged((user) => {
    if (user === null) {
      navigate('/');
    } else {
      CheckAdminStatus(user.uid).then((isAdmin) => {
        if (!isAdmin) navigate('/');
        else setIsAdmin(true);
      });
    }
  });

  if (isAdmin) return children;
};
