import { Timestamp } from '@firebase/firestore';
import { WithMetaData } from './Models';

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

export type MessageWithMetadata = Message & WithMetaData<Message>;
