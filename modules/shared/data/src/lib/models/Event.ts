import { Timestamp } from 'firebase/firestore';

export interface EventData {
  uid: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
}

export class Event {
  uid: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  registrationStart: Date;
  registrationEnd: Date;

  constructor(
    uid: string,
    name: string,
    startDate: Date,
    endDate: Date,
    description: string,
    registrationStart: Date,
    registrationEnd: Date
  ) {
    this.uid = uid;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
  }
}
