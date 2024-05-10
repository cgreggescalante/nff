import { ReactNode } from 'react';
import { Typography } from '@mui/joy';

/* eslint-disable-next-line */
interface LoadingWrapperProps {
  loading: boolean;
  children: ReactNode;
}

export const LoadingWrapper = ({
  loading,
  children,
}: LoadingWrapperProps): ReactNode => {
  if (loading) return <Typography level={'h2'}>Loading...</Typography>;

  return children;
};
