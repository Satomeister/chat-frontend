import { call, put, takeLatest } from "redux-saga/effects";
import {DialogListActionTypes, FetchAddDialogAction} from "./contracts/actionTypes";
import {
  addDialog,
  addDialogError,
  setAddDialogStatus,
  setDialogList,
  setGetDialogsStatus,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { DialogListApi } from "../../../api/dialogListApi";
import { setCurrentDialog } from "../dialog/actionCreators";
import socket from "../../../core/socket";
import { IDialog } from "./contracts/state";

function* fetchDialogListRequest() {
  try {
    yield put(setGetDialogsStatus(LoadingStatus.LOADING));
    const { data } = yield call(DialogListApi.getDialogs);
    data.forEach((dialog: IDialog) => {
      socket.emit("ROOM:JOIN", dialog._id);
    });
    yield put(setDialogList(data));
    yield put(setGetDialogsStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setGetDialogsStatus(LoadingStatus.ERROR));
  }
}

function* fetchAddDialogRequest({ payload }: FetchAddDialogAction) {
  try {
    yield put(addDialogError(""));
    yield put(setAddDialogStatus(LoadingStatus.LOADING));
    const { data } = yield call(DialogListApi.addDialog, payload);
    yield put(addDialog(data.dialog));
    yield put(setCurrentDialog(data.dialog));
    yield put(setAddDialogStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    if (error.response?.status) {
      yield put(addDialogError(error.response.data.message));
    }
    yield put(setAddDialogStatus(LoadingStatus.ERROR));
  }
}

export function* dialogListSaga() {
  yield takeLatest(
    DialogListActionTypes.FETCH_DIALOG_LIST,
    fetchDialogListRequest
  );
  yield takeLatest(
    DialogListActionTypes.FETCH_ADD_DIALOG,
    fetchAddDialogRequest
  );
}
