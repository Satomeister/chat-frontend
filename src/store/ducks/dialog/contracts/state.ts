import { IDialog } from "../../dialogList/contracts/state";

export interface Attachment {
  type: "image" | "document";
  url: string;
}

export interface IMessage {
  _id: string;
  text?: string;
  attachments?: Attachment[];
  dialog: IDialog;
  sender: string;
  user: string;
  createdAt: Date,
  updatedAt: Date,
  read: boolean;
}

export interface SendMessagePayload {
  text?: string;
  attachments?: Attachment[];
  dialog: string;
}