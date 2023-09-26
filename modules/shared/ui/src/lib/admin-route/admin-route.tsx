import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";

export interface AdminRouteProps {
  allowed: boolean,
  redirectPath?: string,
  children?: ReactNode
}

export const AdminRoute = ({ allowed, redirectPath, children }: AdminRouteProps) => {
  return allowed ? <Outlet /> : children ? children : <Navigate to={redirectPath ? redirectPath : "/"} />
}

export default AdminRoute;
