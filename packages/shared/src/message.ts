import { User } from "./index";
export interface Message {
  _id?: string;
  text: string;
  author: string;
  createdAt?: Date;
}
export interface MessageView {
  _id?: string;
  text: string;
  author: User;
  createdAt?: Date;
}
