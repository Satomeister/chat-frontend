import {call, put, takeLatest} from "redux-saga/effects";
import {
  FetchSignInAction,
  FetchSignUpAction,
  UserActionTypes,
} from "./contracts/actionTypes";
import {
  setLoginError,
  setRegError,
  setUserData,
  setUserLoadingStatus,
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {AuthApi} from "../../../api/authApi";
import {showNewOnlineStatus} from "../../../utils/utils";

function* loginRequest({payload}: FetchSignInAction) {
  try {
    yield put(setUserData(null));
    yield put(setLoginError(""));
    localStorage.removeItem("token");
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const {data: res} = yield call(AuthApi.signIn, payload);
    localStorage.setItem("token", res.data.token);
    delete res.data.token;
    res.data.isOnline = true;
    showNewOnlineStatus(true, res.data);
    yield put(setUserData(res.data));
  } catch (error) {
    yield put(setLoginError(error.response?.data?.message));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

function* registrationRequest({payload}: FetchSignUpAction) {
  try {
    yield put(setUserData(null));
    yield put(setRegError(""));
    localStorage.removeItem("token");
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const {data: res} = yield call(AuthApi.signUp, payload);
    localStorage.setItem("token", res.data.token);
    delete res.data.token;
    res.data.isOnline = true
    showNewOnlineStatus(true, res.data);
    yield put(setUserData(res.data));
  } catch (error) {
    yield put(setRegError(error.response?.data?.message));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchUserDataRequest() {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const {data: res} = yield call(AuthApi.getMe);
    res.data.isOnline = true
    showNewOnlineStatus(true, res.data);
    yield put(setUserData(res.data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* userSaga() {
  yield takeLatest(UserActionTypes.FETCH_SIGN_UP, registrationRequest);
  yield takeLatest(UserActionTypes.FETCH_SIGN_IN, loginRequest);
  yield takeLatest(UserActionTypes.FETCH_USER_DATA, fetchUserDataRequest);
}
