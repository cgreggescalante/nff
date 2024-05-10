import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../providers/useAuth';

interface AdminRouteProps {
  children: ReactNode;
}

export default ({ children }: AdminRouteProps): ReactNode => {
  const { isAdmin, loading } = useAuth();

  const navigate = useNavigate();

  if (loading) return;

  if (isAdmin) return children;
  else {
    toast.error('Permission denied.', { toastId: 'addUser-route' });
    navigate('/');
  }
};
