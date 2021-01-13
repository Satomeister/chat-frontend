import { call, put, takeLatest } from "redux-saga/effects";
import {
  FetchSignInAction,
  FetchSignUpAction,
  UserActionTypes,
} from "./contracts/actionTypes";
import {
  setAuthError,
  setUserData,
  setUserLoadingStatus,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { AuthApi } from "../../../api/authApi";

function authRequest(request: any) {
  return function* fetchAuthRequest({
    payload,
  }: FetchSignInAction | FetchSignUpAction) {
    try {
      yield put(setUserData(null));
      yield put(setAuthError(""));
      localStorage.removeItem("token");
      yield put(setUserLoadingStatus(LoadingStatus.LOADING));
      const { data: res } = yield call(request, payload);
      localStorage.setItem("token", res.data.token);
      delete res.data.token;
      yield put(setUserData(res.data));
    } catch (error) {
      console.log(error)
      console.log(error.response)
      yield put(setAuthError(error.response?.data?.message));
      yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
  };
}

function* fetchUserDataRequest() {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data: res } = yield call(AuthApi.getMe);
    yield put(setUserData(res.data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* userSaga() {
  yield takeLatest(UserActionTypes.FETCH_SIGN_UP, authRequest(AuthApi.signUp));
  yield takeLatest(UserActionTypes.FETCH_SIGN_IN, authRequest(AuthApi.signIn));
  yield takeLatest(UserActionTypes.FETCH_USER_DATA, fetchUserDataRequest);
}
