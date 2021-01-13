import { call, put, takeLatest } from "redux-saga/effects";
import { DialogActionTypes } from "./contracts/actionTypes";
import {
  addMessage,
  addMessageStatus,
  getDialogStatus,
  setDialog,
  setMessages,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { dialogApi } from "../../../api/dialogApi";
import { updateDialogLastMessage } from "../dialogList/actionCreators";
import socket from "../../../core/socket";
import {IMessage} from "./contracts/state";

function* fetchGetDialogRequest({ payload }: any) {
  try {
    yield put(getDialogStatus(LoadingStatus.LOADING));
    const { data } = yield call(dialogApi.getDialog, payload);
    yield put(setMessages(data.messages));
    yield put(setDialog(data.dialog));
    yield put(getDialogStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(getDialogStatus(LoadingStatus.ERROR));
  }
}

function* fetchSendMessageRequest({ payload }: any) {
  try {
    yield put(addMessageStatus(LoadingStatus.LOADING));
    const { data } = yield call(dialogApi.sendMessage, payload);
    socket.emit("MESSAGE:NEW_MESSAGE", {
      roomId: data.message.dialog._id,
      message: data.message,
    });
    yield put(addMessage(data.message));
    yield put(updateDialogLastMessage(data.dialog));
    yield put(addMessageStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(addMessageStatus(LoadingStatus.ERROR));
  }
}

export function* dialogSaga() {
  yield takeLatest(DialogActionTypes.FETCH_GET_DIALOG, fetchGetDialogRequest);
  yield takeLatest(
    DialogActionTypes.FETCH_SEND_MESSAGE,
    fetchSendMessageRequest
  );
}