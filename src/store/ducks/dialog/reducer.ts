import produce, { Draft } from "immer";
import { IDialog } from "../dialogList/contracts/state";
import { DialogActions, DialogActionTypes } from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";
import { IMessage } from "./contracts/state";

export interface DialogState {
  dialog: IDialog | null;
  messages: IMessage[];
  addMessageStatus: LoadingStatus;
  getDialogStatus: LoadingStatus;
}

const initialState: DialogState = {
  dialog: null,
  messages: [],
  getDialogStatus: LoadingStatus.NEVER,
  addMessageStatus: LoadingStatus.NEVER,
};

export const dialogReducer = produce(
  (draft: Draft<DialogState>, action: DialogActions) => {
    switch (action.type) {
      case DialogActionTypes.SET_DIALOG:
        draft.dialog = action.payload;
        break;
      case DialogActionTypes.SET_MESSAGES:
        draft.messages = action.payload;
        break;
      case DialogActionTypes.ADD_MESSAGE:
        draft.messages.push(action.payload);
        break;
      case DialogActionTypes.GET_DIALOG_STATUS:
        draft.getDialogStatus = action.payload;
        break;
      case DialogActionTypes.ADD_MESSAGE_STATUS:
        draft.addMessageStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);