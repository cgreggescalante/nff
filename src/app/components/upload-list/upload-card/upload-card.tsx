import { Card, Table } from 'react-bootstrap';
import { Upload } from '@shared-data';

export interface UploadCardProps {
  upload: Upload;
}

export const UploadCard = ({ upload }: UploadCardProps) => (
  <Card>
    <Card.Body>
      {upload.userFirstName && upload.userLastName ? (
        <span>
          {upload.userFirstName} {upload.userLastName}{' '}
        </span>
      ) : (
        <>Anonymous User {'  '}</>
      )}
      <span>{upload.date.toISOString().split('T').join(' ')}</span>

      <Table striped border={1}>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(upload.workouts).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default UploadCard;
