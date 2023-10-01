import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { useUser } from '../../../userContext';

/* eslint-disable-next-line */
interface ProtectedRouteProps {
  admin?: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({ admin, children }: ProtectedRouteProps) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return null;

  if (!user || (admin && user.role !== 'admin')) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(
      location.pathname + location.search
    )}`;
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
};

export default ProtectedRoute;
