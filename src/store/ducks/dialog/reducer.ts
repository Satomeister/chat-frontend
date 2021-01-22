import produce, {Draft} from "immer";
import {IDialog} from "../dialogList/contracts/state";
import {DialogActions, DialogActionTypes} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {IMessage} from "./contracts/state";

export interface DialogState {
  dialog: IDialog | null;
  messages: IMessage[];
  addMessageStatus: LoadingStatus;
  getDialogStatus: LoadingStatus;
  getDialogError: string;
  getExtraMessagesStatus: LoadingStatus | "END";
}

const initialState: DialogState = {
  dialog: null,
  messages: [],
  addMessageStatus: LoadingStatus.NEVER,
  getDialogStatus: LoadingStatus.NEVER,
  getDialogError: "",
  getExtraMessagesStatus: LoadingStatus.NEVER
};

export const dialogReducer = produce(
  (draft: Draft<DialogState>, action: DialogActions) => {
    switch (action.type) {
      case DialogActionTypes.SET_DIALOG:
        draft.dialog = action.payload;
        break;
      case DialogActionTypes.GET_DIALOG_ERROR:
        draft.getDialogError = action.payload;
        break;
      case DialogActionTypes.GET_DIALOG_STATUS:
        draft.getDialogStatus = action.payload;
        break;
      case DialogActionTypes.SET_MESSAGES:
        draft.messages = action.payload;
        break;
      case DialogActionTypes.GET_EXTRA_MESSAGES_STATUS:
        draft.getExtraMessagesStatus = action.payload
        break;
      case DialogActionTypes.ADD_MESSAGE:
        draft.messages.unshift(action.payload);
        break;
      case DialogActionTypes.ADD_MESSAGE_STATUS:
        draft.addMessageStatus = action.payload;
        break;
      case DialogActionTypes.UPDATE_DIALOG_ONLINE_STATUS:
        if (draft.dialog?.admin._id === action.payload.user._id) {
          draft.dialog.admin.isOnline = action.payload.isOnline;
        } else if (draft.dialog?.partner._id === action.payload.user._id) {
          draft.dialog.partner.isOnline = action.payload.isOnline;
        }
        break;
      case DialogActionTypes.SET_MESSAGES_READ:
        draft.messages = draft.messages.map((message) => {
          message.read = true;
          return message;
        });
        break;
      default:
        break;
    }
  },
  initialState
);