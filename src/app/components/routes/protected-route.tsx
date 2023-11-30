import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';
import useUser from '../../../providers/useUser';

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
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
};

export default ProtectedRoute;
