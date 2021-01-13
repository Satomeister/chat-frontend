import { combineReducers } from "redux";
import {userReducer, UserState} from "./ducks/user/reducer";
import {dialogListReducer, DialogListState} from "./ducks/dialogList/reducer";
import {dialogReducer, DialogState} from "./ducks/dialog/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  dialogList: dialogListReducer,
  dialog: dialogReducer,
});

export interface AppState {
 user: UserState,
 dialogList: DialogListState,
 dialog: DialogState
}

export default rootReducer;
