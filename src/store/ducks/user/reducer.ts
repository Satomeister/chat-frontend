import produce, { Draft } from "immer";
import { UserActions, UserActionTypes } from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";
import { IUser } from "./contracts/state";

export interface UserState {
  data: IUser | null;
  status: LoadingStatus;
  loginError: string;
  regError: string;
}

const initialState: UserState = {
  data: null,
  status: LoadingStatus.NEVER,
  loginError: "",
  regError: "",
};

export const userReducer = produce(
  (draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
      case UserActionTypes.SET_LOADING:
        draft.status = action.payload;
        break;
      case UserActionTypes.SET_USER_DATA:
        draft.data = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;
      case UserActionTypes.SET_LOGIN_ERROR:
        draft.loginError = action.payload;
        break;
      case UserActionTypes.SET_REG_ERROR:
        draft.regError = action.payload;
        break;
      case UserActionTypes.UPDATE_USER_ONLINE_STATUS:
        draft.data!.isOnline = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);
