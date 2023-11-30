import { useEffect, useState } from 'react';
import { UserInfo, UserInfoService } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { Table } from 'react-bootstrap';

export const Leaderboard = () => {
  const [rankings, setRankings] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    UserInfoService.getUsersByTotalPoints()
      .then((users) => {
        setRankings(users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error while loading leaderboard: ', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>

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
                  {user.name.firstName} {user.name.lastName}
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
