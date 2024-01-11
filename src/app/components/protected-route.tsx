import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { auth } from '@shared-data';
import useAuth from '../../providers/useAuth';
import { UserProvider } from '../../providers/useUser';

/* eslint-disable-next-line */
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!auth.currentUser) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(
      location.pathname + location.search
    )}`;
    toast.error('You must be logged in to view this page.', {
      toastId: 'protected-route',
    });
    return <Navigate to={redirectUrl} replace />;
  }

  return <UserProvider>{children}</UserProvider>;
};
