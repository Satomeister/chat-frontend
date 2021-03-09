import { IMessage, SendMessagePayload } from "./contracts/state";
import {
  AddMessageAction,
  AddMessageStatusAction,
  DialogActionTypes,
  FetchGetDialogAction,
  FetchGetNewMessagesChunkAction,
  FetchSendMessageAction,
  GetDialogErrorAction,
  GetDialogStatusAction,
  GetExtraMessagesStatusAction,
  SetDialogAction,
  SetMessagesAction,
  SetMessagesReadAction,
  UpdateDialogOnlineStatusAction,
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";
import { IDialog } from "../dialogList/contracts/state";
import { IUser } from "../user/contracts/state";

export const setCurrentDialog = (payload: IDialog): SetDialogAction => ({
  type: DialogActionTypes.SET_DIALOG,
  payload,
});

export const fetchGetDialog = (payload: string): FetchGetDialogAction => ({
  type: DialogActionTypes.FETCH_GET_DIALOG,
  payload,
});

export const fetchGetNewMessagesChunk = (payload: {
  dialogId: string;
  count: number;
}): FetchGetNewMessagesChunkAction => ({
  type: DialogActionTypes.FETCH_GET_NEW_MESSAGES_CHUNK,
  payload,
});

export const getExtraMessagesStatus = (
  payload: LoadingStatus | "END"
): GetExtraMessagesStatusAction => ({
  type: DialogActionTypes.GET_EXTRA_MESSAGES_STATUS,
  payload,
});

export const setMessages = (payload: IMessage[]): SetMessagesAction => ({
  type: DialogActionTypes.SET_MESSAGES,
  payload,
});

export const fetchSendMessage = (
  payload: SendMessagePayload
): FetchSendMessageAction => ({
  type: DialogActionTypes.FETCH_SEND_MESSAGE,
  payload,
});

export const addMessage = (payload: IMessage): AddMessageAction => ({
  type: DialogActionTypes.ADD_MESSAGE,
  payload,
});

export const getDialogStatus = (
  payload: LoadingStatus
): GetDialogStatusAction => ({
  type: DialogActionTypes.GET_DIALOG_STATUS,
  payload,
});

export const addMessageStatus = (
  payload: LoadingStatus
): AddMessageStatusAction => ({
  type: DialogActionTypes.ADD_MESSAGE_STATUS,
  payload,
});

export const updateDialogOnlineStatus = (payload: {
  user: IUser;
  isOnline: boolean;
}): UpdateDialogOnlineStatusAction => ({
  type: DialogActionTypes.UPDATE_DIALOG_ONLINE_STATUS,
  payload,
});

export const setMessagesRead = (payload: string): SetMessagesReadAction => ({
  type: DialogActionTypes.SET_MESSAGES_READ,
  payload,
});

export const getDialogError = (payload: string): GetDialogErrorAction => ({
  type: DialogActionTypes.GET_DIALOG_ERROR,
  payload,
});
