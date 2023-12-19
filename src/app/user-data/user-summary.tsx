import useUser from '../../providers/useUser';
import { Card } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

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
          <LinkContainer to={'/profile'} style={{ cursor: 'pointer' }}>
            <Pencil size={15} />
          </LinkContainer>
        </Card.Title>
        <Card.Subtitle>Subtitle</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
