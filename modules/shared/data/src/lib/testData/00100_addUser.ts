import { db } from './firebase';
import { faker } from '@faker-js/faker';

export const addUser = async () => {
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };

  await db.collection('users').add(user);
};
