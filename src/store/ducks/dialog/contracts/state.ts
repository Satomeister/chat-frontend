import { IDialog } from "../../dialogList/contracts/state";
import {IUser} from "../../user/contracts/state";

export interface IMessage {
  _id: string;
  text?: string;
  attachments?: string[];
  dialog: IDialog;
  sender: IUser;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;
}

export interface SendMessagePayload {
  text?: string;
  attachments?: string[];
  dialog: string;
  isFirstMessage: boolean;
}