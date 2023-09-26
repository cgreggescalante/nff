import { FirestoreDataConverter } from "firebase/firestore";

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

  static converter: FirestoreDataConverter<UserInfo> = {
    toFirestore: (user: UserInfo) => ({
      name: {
        firstName: user.firstName,
        lastName: user.lastName
      },
      uid: user.uid,
      role: user.role
    }),
    fromFirestore: (snapshot, options): UserInfo => {
      const data = snapshot.data(options);
      return new UserInfo(
        data['name'] ? data['name']['firstName'] : "",
        data['name'] ? data['name']['lastName'] : "",
        snapshot.id,
        data['role']
      );
    }
  }
}