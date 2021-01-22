import { Action } from "redux";
import { IMessage, SendMessagePayload } from "./state";
import { LoadingStatus } from "../../../types";
import { IDialog } from "../../dialogList/contracts/state";
import { IUser } from "../../user/contracts/state";

export enum DialogActionTypes {
  SET_DIALOG = "dialog/SET_DIALOG",
  FETCH_GET_DIALOG = "dialog/FETCH_GET_DIALOG",
  GET_DIALOG_ERROR = "dialog/GET_DIALOG_ERROR",
  GET_DIALOG_STATUS = "dialog/GET_DIALOG_STATUS",
  FETCH_GET_NEW_MESSAGES_CHUNK = "dialog/FETCH_GET_NEW_MESSAGES_CHUNK",
  GET_EXTRA_MESSAGES_STATUS = "dialog/GET_EXTRA_MESSAGES_STATUS",
  FETCH_SEND_MESSAGE = "dialog/FETCH_SEND_MESSAGE",
  ADD_MESSAGE = "dialog/ADD_MESSAGE",
  SET_MESSAGES = "dialog/SET_MESSAGES",
  ADD_MESSAGE_STATUS = "dialog/ADD_MESSAGE_STATUS",
  UPDATE_DIALOG_ONLINE_STATUS = "dialog/UPDATE_DIALOG_ONLINE_STATUS",
  ADD_MESSAGE_AND_READ = "dialog/ADD_MESSAGE_AND_READ",
  SET_MESSAGES_READ = "dialog/SET_MESSAGES_READ",
}

export interface SetDialogAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.SET_DIALOG;
  payload: IDialog;
}

export interface FetchGetDialogAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.FETCH_GET_DIALOG;
  payload: string;
}

export interface SetMessagesAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.SET_MESSAGES;
  payload: IMessage[];
}

export interface FetchSendMessageAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.FETCH_SEND_MESSAGE;
  payload: SendMessagePayload;
}

export interface AddMessageAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.ADD_MESSAGE;
  payload: IMessage;
}

export interface GetDialogStatusAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.GET_DIALOG_STATUS;
  payload: LoadingStatus;
}

export interface AddMessageStatusAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.ADD_MESSAGE_STATUS;
  payload: LoadingStatus;
}

export interface UpdateDialogOnlineStatusAction
  extends Action<DialogActionTypes> {
  type: DialogActionTypes.UPDATE_DIALOG_ONLINE_STATUS;
  payload: {
    user: IUser;
    isOnline: boolean;
  };
}

export interface AddMessageAndReadAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.ADD_MESSAGE_AND_READ;
  payload: IMessage;
}

export interface SetMessagesReadAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.SET_MESSAGES_READ;
  payload: string;
}

export interface GetDialogErrorAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.GET_DIALOG_ERROR;
  payload: string;
}

export interface FetchGetNewMessagesChunkAction
  extends Action<DialogActionTypes> {
  type: DialogActionTypes.FETCH_GET_NEW_MESSAGES_CHUNK;
  payload: {
    dialogId: string;
    count: number;
  };
}

export interface GetExtraMessagesStatusAction
  extends Action<DialogActionTypes> {
  type: DialogActionTypes.GET_EXTRA_MESSAGES_STATUS;
  payload: LoadingStatus | "END";
}

export type DialogActions =
  | SetDialogAction
  | FetchGetDialogAction
  | SetMessagesAction
  | FetchSendMessageAction
  | FetchGetNewMessagesChunkAction
  | GetExtraMessagesStatusAction
  | AddMessageAction
  | GetDialogStatusAction
  | AddMessageStatusAction
  | UpdateDialogOnlineStatusAction
  | AddMessageAndReadAction
  | SetMessagesReadAction
  | GetDialogErrorAction;
