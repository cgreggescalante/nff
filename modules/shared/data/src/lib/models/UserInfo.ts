export class UserInfo {
  firstName: string;
  lastName: string;
  uid: string;
  role: string;
  totalPoints: number;

  constructor(
    firstName: string,
    lastName: string,
    uid: string,
    role: string,
    totalPoints: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.uid = uid;
    this.role = role;
    this.totalPoints = totalPoints;
  }
}
