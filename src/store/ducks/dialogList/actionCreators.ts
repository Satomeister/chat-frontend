import {
  AddDialogAction,
  AddDialogErrorAction,
  DialogListActionTypes,
  FetchAddDialogAction,
  FetchDialogListAction,
  SetAddDialogStatusAction,
  SetDialogListAction,
  SetGetDialogsStatusAction,
  UpdateDialogLastMessageAction,
} from "./contracts/actionTypes";
import { IDialog } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const fetchDialogList = (payload: string): FetchDialogListAction => ({
  type: DialogListActionTypes.FETCH_DIALOG_LIST,
});

export const setDialogList = (payload: IDialog[]): SetDialogListAction => ({
  type: DialogListActionTypes.SET_DIALOG_LIST,
  payload,
});

export const fetchAddDialog = (payload: string): FetchAddDialogAction => ({
  type: DialogListActionTypes.FETCH_ADD_DIALOG,
  payload,
});

export const addDialog = (payload: IDialog): AddDialogAction => ({
  type: DialogListActionTypes.ADD_DIALOG,
  payload,
});

export const setGetDialogsStatus = (
  payload: LoadingStatus
): SetGetDialogsStatusAction => ({
  type: DialogListActionTypes.SET_GET_DIALOGS_STATUS,
  payload,
});

export const setAddDialogStatus = (
  payload: LoadingStatus
): SetAddDialogStatusAction => ({
  type: DialogListActionTypes.SET_ADD_DIALOG_STATUS,
  payload,
});

export const updateDialogLastMessage = (
  payload: IDialog
): UpdateDialogLastMessageAction => ({
  type: DialogListActionTypes.UPDATE_DIALOG_LAST_MESSAGE,
  payload,
});

export const addDialogError = (payload: string): AddDialogErrorAction => ({
  type: DialogListActionTypes.ADD_DIALOG_ERROR,
  payload,
});