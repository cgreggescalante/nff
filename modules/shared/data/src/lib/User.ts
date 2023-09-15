import { FirestoreDataConverter } from "firebase/firestore";

export interface User {
  email: string
  firstName: string,
  lastName: string,
  username: string,
  id: number
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User) => ({
    email: user.email,
    name: {
      firstName: user.firstName,
      lastName: user.lastName
    },
    username: user.username
  }),
  fromFirestore: (snapshot, options): User => {
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