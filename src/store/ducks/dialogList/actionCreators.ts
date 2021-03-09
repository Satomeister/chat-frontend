import {
  AddDialogAction,
  AddDialogErrorAction,
  DialogListActionTypes,
  FetchAddDialogAction,
  FetchDialogListAction,
  SetAddDialogStatusAction,
  SetDialogLastMessageReadAction,
  SetDialogListAction,
  SetDialogUnreadMessagesCountAction,
  SetGetDialogsStatusAction,
  UpdateDialogListItemAction,
  UpdateDialogListItemStatusOnlineAction,
} from "./contracts/actionTypes";
import { IDialog } from "./contracts/state";
import { LoadingStatus } from "../../types";
import { IUser } from "../user/contracts/state";

export const fetchDialogList = (): FetchDialogListAction => ({
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

export const updateDialogListItem = (
  payload: IDialog
): UpdateDialogListItemAction => ({
  type: DialogListActionTypes.UPDATE_DIALOG_LIST_ITEM,
  payload,
});

export const addDialogError = (payload: string): AddDialogErrorAction => ({
  type: DialogListActionTypes.ADD_DIALOG_ERROR,
  payload,
});

export const setDialogUnreadMessagesCount = (
  payload: string
): SetDialogUnreadMessagesCountAction => ({
  type: DialogListActionTypes.SET_DIALOG_UNREAD_MESSAGES_COUNT,
  payload,
});

export const setDialogLastMessageRead = (
  payload: string
): SetDialogLastMessageReadAction => ({
  type: DialogListActionTypes.SET_DIALOG_LAST_MESSAGE_READ,
  payload,
});

export const updateDialogListItemStatusOnline = (
  payload: IUser
): UpdateDialogListItemStatusOnlineAction => ({
  type: DialogListActionTypes.UPDATE_DIALOG_LIST_ITEM_STATUS_ONLINE,
  payload,
});
