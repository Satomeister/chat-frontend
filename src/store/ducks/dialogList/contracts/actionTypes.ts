import { Action } from "redux";
import { IDialog } from "./state";
import { LoadingStatus } from "../../../types";
import { IUser } from "../../user/contracts/state";

export enum DialogListActionTypes {
  FETCH_DIALOG_LIST = "dialogList/FETCH_DIALOG_LIST",
  SET_DIALOG_LIST = "dialogList/SET_DIALOG_LIST",
  FETCH_ADD_DIALOG = "dialogList/FETCH_ADD_DIALOG",
  ADD_DIALOG = "dialogList/ADD_DIALOG",
  SET_GET_DIALOGS_STATUS = "dialogList/SET_GET_DIALOGS_STATUS",
  SET_ADD_DIALOG_STATUS = "dialogList/SET_ADD_DIALOG_STATUS",
  UPDATE_DIALOG_LAST_MESSAGE = "dialogList/UPDATE_DIALOG_LAST_MESSAGE",
  ADD_DIALOG_ERROR = "dialogList/ADD_DIALOG_ERROR",
  SET_DIALOG_UNREAD_MESSAGES_COUNT = "dialogList/SET_UNREAD_MESSAGES_COUNT",
  SET_DIALOG_LAST_MESSAGE_READ = "dialogList/SET_DIALOG_LAST_MESSAGE_READ",
  UPDATE_DIALOG_LIST_ITEM_STATUS_ONLINE = "dialogList/UPDATE_DIALOG_LIST_ITEM_STATUS_ONLINE",
}

export interface FetchDialogListAction extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.FETCH_DIALOG_LIST;
}

export interface SetDialogListAction extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.SET_DIALOG_LIST;
  payload: IDialog[];
}

export interface FetchAddDialogAction extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.FETCH_ADD_DIALOG;
  payload: string;
}

export interface AddDialogAction extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.ADD_DIALOG;
  payload: IDialog;
}

export interface SetGetDialogsStatusAction
  extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.SET_GET_DIALOGS_STATUS;
  payload: LoadingStatus;
}

export interface SetAddDialogStatusAction
  extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.SET_ADD_DIALOG_STATUS;
  payload: LoadingStatus;
}

export interface UpdateDialogLastMessageAction
  extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.UPDATE_DIALOG_LAST_MESSAGE;
  payload: IDialog;
}

export interface AddDialogErrorAction extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.ADD_DIALOG_ERROR;
  payload: string;
}

export interface SetDialogUnreadMessagesCountAction
  extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.SET_DIALOG_UNREAD_MESSAGES_COUNT;
  payload: string;
}

export interface SetDialogLastMessageReadAction
  extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.SET_DIALOG_LAST_MESSAGE_READ;
  payload: string;
}

export interface UpdateDialogListItemStatusOnlineAction
  extends Action<DialogListActionTypes> {
  type: DialogListActionTypes.UPDATE_DIALOG_LIST_ITEM_STATUS_ONLINE;
  payload: IUser;
}

export type DialogListActions =
  | FetchDialogListAction
  | SetDialogListAction
  | FetchAddDialogAction
  | AddDialogAction
  | SetAddDialogStatusAction
  | SetGetDialogsStatusAction
  | UpdateDialogLastMessageAction
  | AddDialogErrorAction
  | SetDialogUnreadMessagesCountAction
  | SetDialogLastMessageReadAction
  | UpdateDialogListItemStatusOnlineAction;
