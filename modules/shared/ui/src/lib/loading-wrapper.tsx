import { ReactNode } from 'react';

/* eslint-disable-next-line */
interface LoadingWrapperProps {
  loading: boolean;
  children: ReactNode;
}

export const LoadingWrapper = ({
  loading,
  children,
}: LoadingWrapperProps): ReactNode => {
  if (loading) return <h2>Loading...</h2>;

  return children;
};
