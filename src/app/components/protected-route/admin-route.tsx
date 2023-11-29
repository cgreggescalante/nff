import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../useAuth';

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps): ReactNode => {
  const { isAdmin, loading } = useAuth();

  const navigate = useNavigate();

  if (loading) return;

  if (isAdmin) return children;
  else navigate('/');
};
