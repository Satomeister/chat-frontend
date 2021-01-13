import produce, { Draft } from "immer";
import {
  DialogListActions,
  DialogListActionTypes,
} from "./contracts/actionTypes";
import { IDialog } from "./contracts/state";
import { LoadingStatus } from "../../types";

export interface DialogListState {
  dialogs: IDialog[];
  getDialogsStatus: LoadingStatus;
  addDialogStatus: LoadingStatus;
  addDialogError: string;
}

const initialState: DialogListState = {
  dialogs: [],
  addDialogError: "",
  getDialogsStatus: LoadingStatus.NEVER,
  addDialogStatus: LoadingStatus.NEVER,
};

export const dialogListReducer = produce(
  (draft: Draft<DialogListState>, action: DialogListActions) => {
    switch (action.type) {
      case DialogListActionTypes.SET_DIALOG_LIST:
        draft.dialogs = action.payload;
        break;
      case DialogListActionTypes.ADD_DIALOG:
        draft.dialogs.push(action.payload);
        break;
      case DialogListActionTypes.SET_ADD_DIALOG_STATUS:
        draft.addDialogStatus = action.payload;
        break;
      case DialogListActionTypes.SET_GET_DIALOGS_STATUS:
        draft.getDialogsStatus = action.payload;
        break;
      case DialogListActionTypes.UPDATE_DIALOG_LAST_MESSAGE:
        draft.dialogs = draft.dialogs.map((dialog) =>
          dialog._id === action.payload._id ? action.payload : dialog
        );
        break;
      case DialogListActionTypes.ADD_DIALOG_ERROR:
        draft.addDialogError = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
); 