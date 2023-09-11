import styles from './upload-card.module.scss';
import { Card, Table } from "react-bootstrap";
import { Upload, Workout } from "@shared-data";

/* eslint-disable-next-line */
export interface UploadCardProps {
  upload: Upload
}

export function UploadCard({ upload }: UploadCardProps) {
  return (
    <Card>
      <Card.Body>
        <span>{ upload.user.firstName } { upload.user.lastName } { upload.user.id }</span>
        <span>{ upload.date.toISOString().split("T")[0] }</span>
        <Table striped border={1}>
          <thead>
            <tr>
              <th>Workout Type</th>
              <th>Duration</th>
              <th>Points Earned</th>
            </tr>
          </thead>
          <tbody>
          {
            upload.workouts.map((workout: Workout) =>
              <tr>
                <td>{ workout.workoutType }</td>
                <td>{ workout.duration }</td>
                <td>{ workout.points }</td>
              </tr>
            )
          }
            <tr>
              <td></td>
              <td><b>Total</b></td>
              <td>{ upload.workouts.reduce((sum, workout) => sum + workout.points, 0) }</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default UploadCard;
