import useUser from '../../providers/useUser';
import { Card } from 'react-bootstrap';

export const UserSummary = () => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {user.firstName} {user.lastName}{' '}
        </Card.Title>
        <Card.Subtitle>Subtitle</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
