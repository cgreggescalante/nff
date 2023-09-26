import { FirestoreDataConverter } from "firebase/firestore";

export class UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  role: string[];

  constructor(email: string, firstName: string, lastName: string, id: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.role = [];
  }

  static converter: FirestoreDataConverter<UserInfo> = {
    toFirestore: (user: UserInfo) => ({
      email: user.email,
      name: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    }),
    fromFirestore: (snapshot, options): UserInfo => {
      const data = snapshot.data(options);
      return new UserInfo(
        data['email'],
        data['name'] ? data['name']['firstName'] : "",
        data['name'] ? data['name']['lastName'] : "",
        data['id']
      );
    }
  }
}