import { Action } from "redux";
import { IDialog } from "./state";
import { LoadingStatus } from "../../../types";

export enum DialogListActionTypes {
  FETCH_DIALOG_LIST = "dialogList/FETCH_DIALOG_LIST",
  SET_DIALOG_LIST = "dialogList/SET_DIALOG_LIST",
  FETCH_ADD_DIALOG = "dialogList/FETCH_ADD_DIALOG",
  ADD_DIALOG = "dialogList/ADD_DIALOG",
  SET_GET_DIALOGS_STATUS = "dialogList/SET_GET_DIALOGS_STATUS",
  SET_ADD_DIALOG_STATUS = "dialogList/SET_ADD_DIALOG_STATUS",
  UPDATE_DIALOG_LAST_MESSAGE = "dialogList/UPDATE_DIALOG_LAST_MESSAGE",
  ADD_DIALOG_ERROR = "dialogList/ADD_DIALOG_ERROR",
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

export type DialogListActions =
  | FetchDialogListAction
  | SetDialogListAction
  | FetchAddDialogAction
  | AddDialogAction
  | SetAddDialogStatusAction
  | SetGetDialogsStatusAction
  | UpdateDialogLastMessageAction
  | AddDialogErrorAction;
