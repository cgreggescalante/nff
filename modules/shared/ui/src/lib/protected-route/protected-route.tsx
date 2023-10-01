import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';

/* eslint-disable-next-line */
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({
  isAuthenticated,
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(
      location.pathname + location.search
    )}`;
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
};

export default ProtectedRoute;
