import styles from './loadable.module.scss';
import { ReactNode, useEffect, useState } from "react";

/* eslint-disable-next-line */
export interface LoadableProps {
  children?: ReactNode,
  getData: () => Promise<object>,
  resolve: (data: object) => void
  errorMessage: string
}

export const Loadable = ({ children, getData, resolve, errorMessage }: LoadableProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getData()
      .then((data: object) => {
        resolve(data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, [getData, resolve]);

  return loading ?
    <h2>Loading...</h2> :
    error ?
      <h4>{errorMessage}</h4> :
      children
}

export default Loadable;
