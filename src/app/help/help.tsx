import styles from './help.module.scss';

/* eslint-disable-next-line */
export interface HelpProps {}

export function Help(props: HelpProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Help!</h1>
    </div>
  );
}

export default Help;
