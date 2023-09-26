import styles from './admin-tools.module.scss';

/* eslint-disable-next-line */
export interface AdminToolsProps {}

export function AdminTools(props: AdminToolsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminTools!</h1>
    </div>
  );
}

export default AdminTools;
