import { Action } from "redux";
import { IMessage, SendMessagePayload } from "./state";
import { LoadingStatus } from "../../../types";
import {IDialog} from "../../dialogList/contracts/state";

export enum DialogActionTypes {
  SET_DIALOG = 'dialog/SET_DIALOG',
  FETCH_GET_DIALOG = 'dialog/FETCH_GET_DIALOG',
  SET_MESSAGES = "dialog/SET_MESSAGES",
  FETCH_SEND_MESSAGE = "dialog/FETCH_SEND_MESSAGE",
  ADD_MESSAGE = "dialog/ADD_MESSAGE",
  GET_DIALOG_STATUS = "dialog/GET_DIALOG_STATUS",
  ADD_MESSAGE_STATUS = "dialog/ADD_MESSAGE_STATUS",
}

export interface SetDialogAction extends Action<DialogActionTypes> {
  type: DialogActionTypes.SET_DIALOG,
  payload: IDialog
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

export interface GetDialogStatus extends Action<DialogActionTypes> {
  type: DialogActionTypes.GET_DIALOG_STATUS;
  payload: LoadingStatus;
}

export interface AddMessageStatus extends Action<DialogActionTypes> {
  type: DialogActionTypes.ADD_MESSAGE_STATUS;
  payload: LoadingStatus;
}

export type DialogActions =
  | SetDialogAction
  | FetchGetDialogAction
  | SetMessagesAction
  | FetchSendMessageAction
  | AddMessageAction
  | GetDialogStatus
  | AddMessageStatus;
