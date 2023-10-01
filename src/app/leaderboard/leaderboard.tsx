import styles from './leaderboard.module.scss';

/* eslint-disable-next-line */
export interface LeaderboardProps {}

export function Leaderboard(props: LeaderboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Leaderboard!</h1>
    </div>
  );
}

export default Leaderboard;
