import { Timestamp } from '@firebase/firestore';

export interface MessageData {
  text: string;
  link: string;
  expirationDate: Timestamp;
}

export interface Message {
  text: string;
  link: string;
  expirationDate: Date;
}
