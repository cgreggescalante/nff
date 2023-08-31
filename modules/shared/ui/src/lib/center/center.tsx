import styles from './center.module.scss';
import React, { ReactNode } from "react";

/* eslint-disable-next-line */
export interface CenterProps {
  children?: ReactNode
}

export function Center({ children }: CenterProps) {
  return (
    <div className={styles['container']}>
      <div>
        { children }
      </div>
    </div>
  );
}

export default Center;
