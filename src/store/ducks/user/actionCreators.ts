import { IUser, SignInPayload, SignUpPayload } from "./contracts/state";
import {
  FetchSignInAction,
  FetchSignUpAction,
  FetchUserDataAction,
  SetLoginErrorAction,
  SetRegErrorAction,
  SetUserDataAction,
  SetUserLoadingStatusAction,
  UpdateUserOnlineStatusAction,
  UserActionTypes,
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";

export const setUserData = (payload: IUser | null): SetUserDataAction => ({
  type: UserActionTypes.SET_USER_DATA,
  payload,
});

export const fetchUserData = (): FetchUserDataAction => ({
  type: UserActionTypes.FETCH_USER_DATA,
});

export const fetchSignIn = (payload: SignInPayload): FetchSignInAction => ({
  type: UserActionTypes.FETCH_SIGN_IN,
  payload,
});

export const fetchSignUp = (payload: SignUpPayload): FetchSignUpAction => ({
  type: UserActionTypes.FETCH_SIGN_UP,
  payload,
});

export const setUserLoadingStatus = (
  payload: LoadingStatus
): SetUserLoadingStatusAction => ({
  type: UserActionTypes.SET_LOADING,
  payload,
});

export const setLoginError = (payload: string): SetLoginErrorAction => ({
  type: UserActionTypes.SET_LOGIN_ERROR,
  payload,
});

export const setRegError = (payload: string): SetRegErrorAction => ({
  type: UserActionTypes.SET_REG_ERROR,
  payload,
});

export const updateUserOnlineStatus = (
  payload: boolean
): UpdateUserOnlineStatusAction => ({
  type: UserActionTypes.UPDATE_USER_ONLINE_STATUS,
  payload,
});