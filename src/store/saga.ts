import { all } from "redux-saga/effects";
import { userSaga } from "./ducks/user/sagas";
import {dialogListSaga} from "./ducks/dialogList/sagas";
import {dialogSaga} from "./ducks/dialog/sagas";

export default function* rootSaga() {
  yield all([userSaga(), dialogListSaga(), dialogSaga()]);
}