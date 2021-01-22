import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  AddMessageAndReadAction,
  DialogActionTypes,
  FetchGetNewMessagesChunkAction,
  FetchSendMessageAction,
} from "./contracts/actionTypes";
import {
  addMessage,
  addMessageStatus,
  getDialogError,
  getDialogStatus,
  getExtraMessagesStatus,
  setCurrentDialog,
  setMessages,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { dialogApi } from "../../../api/dialogApi";
import {
  setDialogUnreadMessagesCount,
  updateDialogLastMessage,
} from "../dialogList/actionCreators";
import socket from "../../../core/socket";
import { AppState } from "../../rootReducer";

function* fetchGetDialogRequest({ payload }: any) {
  try {
    yield put(getDialogError(""));
    yield put(getExtraMessagesStatus(LoadingStatus.NEVER));
    yield put(getDialogStatus(LoadingStatus.LOADING));
    const { data } = yield call(dialogApi.getDialog, payload);
    socket.emit("MESSAGE:READ", data.dialog._id);
    yield put(setMessages(data.messages));
    yield put(setCurrentDialog(data.dialog));
    yield put(setDialogUnreadMessagesCount(data.dialog._id));
    yield put(getDialogStatus(LoadingStatus.SUCCESS));
    if (data.messages.length < messagesChunk) {
      yield put(getExtraMessagesStatus('END'));
    }
  } catch (error) {
    if (error.response.status === 404) {
      yield put(getDialogError("Dialog not found"));
    }
    yield put(getDialogStatus(LoadingStatus.ERROR));
  }
}

function* fetchSendMessageRequest({ payload }: FetchSendMessageAction) {
  try {
    const { data } = yield call(dialogApi.sendMessage, payload);
    yield put(addMessage(data.message));
    if (payload.isFirstMessage) {
      socket.emit("DIALOG:CREATE_DIALOG", data.dialog);
    } else {
      socket.emit("MESSAGE:NEW_MESSAGE", {
        roomId: data.message.dialog._id,
        dialog: data.dialog,
        message: data.message,
      });
    }
    yield put(updateDialogLastMessage(data.dialog));
    yield put(addMessageStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(addMessageStatus(LoadingStatus.ERROR));
  }
}

function* fetchAddMessageAndReadRequest({ payload }: AddMessageAndReadAction) {
  try {
    payload.read = true;
    yield put(addMessage(payload));
    yield call(dialogApi.updateMessageReadStatus, payload._id);
  } catch (error) {}
}

const getMessages = (state: AppState) => state.dialog.messages;
const messagesChunk = 30

function* fetchGetNewMessagesChunkRequest({
  payload,
}: FetchGetNewMessagesChunkAction) {
  try {
    yield put(getExtraMessagesStatus(LoadingStatus.LOADING));
    const messages = yield select(getMessages);
    const { data } = yield call(dialogApi.getNewMessagesChunk, payload);
    yield put(setMessages([...messages, ...data]));
    if (data.length < messagesChunk) {
      yield put(getExtraMessagesStatus('END'));
    } else {
      yield put(getExtraMessagesStatus(LoadingStatus.SUCCESS));
    }
  } catch (error) {}
}

export function* dialogSaga() {
  yield takeLatest(DialogActionTypes.FETCH_GET_DIALOG, fetchGetDialogRequest);
  yield takeLatest(
    DialogActionTypes.FETCH_SEND_MESSAGE,
    fetchSendMessageRequest
  );
  yield takeLatest(
    DialogActionTypes.ADD_MESSAGE_AND_READ,
    fetchAddMessageAndReadRequest
  );
  yield takeLatest(
    DialogActionTypes.FETCH_GET_NEW_MESSAGES_CHUNK,
    fetchGetNewMessagesChunkRequest
  );
}