import styles from './workout-card.module.scss';
import { Card, Table } from "react-bootstrap";

/* eslint-disable-next-line */
export interface UploadCardProps {
  upload: Upload
}

export interface User {
  firstName: string,
  lastName: string,
  id: number
}

export interface Upload {
  user: User,
  date: Date
  workouts: Workout[]
  points: number
}

export interface Workout {
  workoutType: WorkoutType,
  duration: number,
  points: number
}

export enum WorkoutType {
  Run = "Run",
  Bike = "Bike",
  Swim = "Swim",
  Ski = "Ski",
}

/*
  Fields to display
    - Upload date
    - User
    - Workout type
    - Distance / Duration
    - Point total
 */

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
              <td>{ upload.points }</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default UploadCard;
