import styles from './leaderboard.module.scss';
import { useEffect, useState } from 'react';
import { UserInfo, UserInfoService } from '@shared-data';
import LoadingWrapper from '../components/loading-wrapper/loading-wrapper';
import { Table } from 'react-bootstrap';

export const Leaderboard = () => {
  const [rankings, setRankings] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    UserInfoService.getUsersByTotalPoints().then((users) => {
      setRankings(users);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Leaderboard!</h1>

      <LoadingWrapper loading={loading}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </LoadingWrapper>
    </div>
  );
};

export default Leaderboard;
