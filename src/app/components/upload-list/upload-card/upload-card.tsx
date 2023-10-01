import { Card, Table } from 'react-bootstrap';
import { Upload, Workout } from '@shared-data';

export interface UploadCardProps {
  upload: Upload;
}

export const UploadCard = ({ upload }: UploadCardProps) => (
  <Card>
    <Card.Body>
      {upload.user && upload.user.firstName ? (
        <span>
          {upload.user.firstName} {upload.user.lastName} {upload.user.uid}
          {'  '}
        </span>
      ) : (
        <>Anonymous User {'  '}</>
      )}
      <span>{upload.date.toISOString().split('T').join(' ')}</span>

      <Table striped border={1}>
        <thead>
          <tr>
            <th>Workout Type</th>
            <th>Duration</th>
            <th>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {upload.workouts.map((workout: Workout, index) => (
            <tr key={index}>
              <td>{workout.workoutType.name}</td>
              <td>{workout.duration}</td>
              <td>{Math.round(workout.points * 100) / 100}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <b>Total</b>
            </td>
            <td>
              {Math.round(
                upload.workouts.reduce(
                  (sum, workout) => sum + workout.points,
                  0
                ) * 100
              ) / 100}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default UploadCard;
