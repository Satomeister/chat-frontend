import { AppState } from "../../rootReducer";
import { IUser } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const selectUserState = (state: AppState): IUser | null =>
  state.user.data;
export const selectUserId = (state: AppState): string | undefined =>
  state.user.data?._id;
export const selectIsAuth = (state: AppState): boolean => !!state.user.data;
export const selectLoginError = (state: AppState): string | null =>
  state.user.loginError;
export const selectRegError = (state: AppState): string | null =>
  state.user.regError;
export const selectUserStatus = (state: AppState): LoadingStatus =>
  state.user.status;
