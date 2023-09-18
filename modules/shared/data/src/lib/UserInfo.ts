import { FirestoreDataConverter } from "firebase/firestore";

export interface UserInfo {
  email: string
  firstName: string,
  lastName: string,
  username: string,
  id: number
}

export const userConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (user: UserInfo) => ({
    email: user.email,
    name: {
      firstName: user.firstName,
      lastName: user.lastName
    },
    username: user.username
  }),
  fromFirestore: (snapshot, options): UserInfo => {
    const data = snapshot.data(options);
    return {
      email: data['email'],
      firstName: data['name'] ? data['name']['firstName'] : "",
      lastName: data['name'] ? data['name']['lastName'] : "",
      username: data['username'],
      id: data['id']
    };
  }
}