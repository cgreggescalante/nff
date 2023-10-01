import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export interface AdminRouteProps {
  allowed: boolean;
  children: ReactNode;
}

export const AdminRoute = ({ allowed, children }: AdminRouteProps) =>
  allowed ? children : <Navigate to={'/'} />;

export default AdminRoute;
