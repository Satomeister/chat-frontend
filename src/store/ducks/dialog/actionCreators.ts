import { IMessage, SendMessagePayload } from "./contracts/state";
import {
  AddMessageAction, AddMessageStatus,
  DialogActionTypes,
  FetchGetDialogAction,
  FetchSendMessageAction,
  GetDialogStatus, SetDialogAction,
  SetMessagesAction,
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";
import {IDialog} from "../dialogList/contracts/state";

export const setDialog = (payload: IDialog): SetDialogAction => ({
  type: DialogActionTypes.SET_DIALOG,
  payload
});

export const fetchGetDialog = (payload: string): FetchGetDialogAction => ({
  type: DialogActionTypes.FETCH_GET_DIALOG,
  payload,
});

export const setMessages = (payload: IMessage[]): SetMessagesAction => ({
  type: DialogActionTypes.SET_MESSAGES,
  payload
})

export const fetchSendMessage = (payload: SendMessagePayload): FetchSendMessageAction => ({
  type: DialogActionTypes.FETCH_SEND_MESSAGE,
  payload
})

export const addMessage = (payload: IMessage): AddMessageAction => ({
  type: DialogActionTypes.ADD_MESSAGE,
  payload
})

export const getDialogStatus = (payload: LoadingStatus): GetDialogStatus => ({
  type: DialogActionTypes.GET_DIALOG_STATUS,
  payload
})

export const addMessageStatus = (payload: LoadingStatus): AddMessageStatus => ({
  type: DialogActionTypes.ADD_MESSAGE_STATUS,
  payload
})