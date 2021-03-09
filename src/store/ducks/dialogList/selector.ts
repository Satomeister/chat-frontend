import { AppState } from "../../rootReducer";
import { LoadingStatus } from "../../types";
import { IDialog } from "./contracts/state";

export const selectDialogs = (state: AppState): IDialog[] =>
  state.dialogList.dialogs;
export const selectAddDialogStatus = (state: AppState): LoadingStatus =>
  state.dialogList.addDialogStatus;
export const selectGetDialogsStatus = (state: AppState): LoadingStatus =>
  state.dialogList.getDialogsStatus;
export const selectAddDialogError = (state: AppState): string =>
  state.dialogList.addDialogError;
