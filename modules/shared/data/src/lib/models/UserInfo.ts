export class UserInfo {
  firstName: string;
  lastName: string;
  uid: string;
  role: string;

  constructor(firstName: string, lastName: string, uid: string, role: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.uid = uid;
    this.role = role;
  }
}
