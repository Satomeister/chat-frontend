import { AppState } from "../../rootReducer";
import { LoadingStatus } from "../../types";
import {IDialog} from "../dialogList/contracts/state";
import {IMessage} from "./contracts/state";

export const selectDialog = (state: AppState): IDialog | null => state.dialog.dialog;
export const selectDialogId = (state: AppState): string | undefined => state.dialog.dialog?._id;
export const selectMessages = (state: AppState): IMessage[] => state.dialog.messages;
export const selectAddMessageStatus = (state: AppState): LoadingStatus =>
  state.dialog.addMessageStatus;
export const selectGetMessagesStatus = (state: AppState): LoadingStatus =>
  state.dialog.getDialogStatus;
