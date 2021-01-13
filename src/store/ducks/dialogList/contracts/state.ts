import { IUser } from "../../user/contracts/state";
import { IMessage } from "../../dialog/contracts/state";

export interface IDialog {
  _id: string;
  admin: IUser;
  partner: IUser;
  messageCount: number;
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}
