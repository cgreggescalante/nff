import styles from './test-page.module.scss';

/* eslint-disable-next-line */
export interface TestPageProps {}

export function TestPage(props: TestPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TestPage!</h1>
    </div>
  );
}

export default TestPage;
