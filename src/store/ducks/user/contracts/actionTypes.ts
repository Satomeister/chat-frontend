import { Action } from "redux";
import { IUser, SignInPayload, SignUpPayload } from "./state";
import { LoadingStatus } from "../../../types";

export enum UserActionTypes {
  SET_USER_DATA = "user/SET_USER_DATA",
  FETCH_USER_DATA = "user/FETCH_USER_DATA",
  FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
  FETCH_SIGN_UP = "user/FETCH_SIGN_UP",
  SET_LOADING = "user/SET_LOADING",
  SET_LOGIN_ERROR = "user/SET_LOGIN_ERROR",
  SET_REG_ERROR = "user/SET_REG_ERROR",
  UPDATE_USER_ONLINE_STATUS = "user/UPDATE_USER_ONLINE_STATUS",
}

export interface SetUserDataAction extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER_DATA;
  payload: IUser | null;
}

export interface FetchUserDataAction extends Action<UserActionTypes> {
  type: UserActionTypes.FETCH_USER_DATA;
}

export interface FetchSignInAction extends Action<UserActionTypes> {
  type: UserActionTypes.FETCH_SIGN_IN;
  payload: SignInPayload;
}

export interface FetchSignUpAction extends Action<UserActionTypes> {
  type: UserActionTypes.FETCH_SIGN_UP;
  payload: SignUpPayload;
}

export interface SetUserLoadingStatusAction extends Action<UserActionTypes> {
  type: UserActionTypes.SET_LOADING;
  payload: LoadingStatus;
}

export interface SetLoginErrorAction extends Action<UserActionTypes> {
  type: UserActionTypes.SET_LOGIN_ERROR;
  payload: string;
}

export interface SetRegErrorAction extends Action<UserActionTypes> {
  type: UserActionTypes.SET_REG_ERROR;
  payload: string;
}

export interface UpdateUserOnlineStatusAction extends Action<UserActionTypes> {
  type: UserActionTypes.UPDATE_USER_ONLINE_STATUS;
  payload: boolean;
}

export type UserActions =
  | SetUserDataAction
  | FetchUserDataAction
  | FetchSignInAction
  | FetchSignUpAction
  | SetUserLoadingStatusAction
  | SetLoginErrorAction
  | SetRegErrorAction
  | UpdateUserOnlineStatusAction;
