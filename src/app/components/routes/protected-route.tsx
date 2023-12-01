import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';
import useUser from '../../../providers/useUser';
import { toast } from 'react-toastify';

/* eslint-disable-next-line */
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(
      location.pathname + location.search
    )}`;
    toast.error('You must be logged in to view this page.', {
      toastId: 'protected-route',
    });
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
};

export default ProtectedRoute;
