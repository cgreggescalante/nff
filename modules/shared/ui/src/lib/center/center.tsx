import styles from './center.module.scss';

/* eslint-disable-next-line */
export interface CenterProps {}

export function Center(props: CenterProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Center!</h1>
    </div>
  );
}

export default Center;
