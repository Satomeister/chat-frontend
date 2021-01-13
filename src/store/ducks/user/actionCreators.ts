import { IUser, SignInPayload, SignUpPayload } from "./contracts/state";
import {
  FetchSignInAction,
  FetchSignUpAction,
  FetchUserDataAction,
  setAuthErrorAction,
  SetUserDataAction,
  SetUserLoadingStatusAction,
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

export const setAuthError = (payload: string): setAuthErrorAction => ({
  type: UserActionTypes.SET_AUTH_ERROR,
  payload,
});