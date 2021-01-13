import produce, { Draft } from "immer";
import { UserActions, UserActionTypes } from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";
import { IUser } from "./contracts/state";

export interface UserState {
  data: IUser | null;
  status: LoadingStatus;
  authError: string | null;
}

const initialState: UserState = {
  data: null,
  status: LoadingStatus.NEVER,
  authError: null,
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
      case UserActionTypes.SET_AUTH_ERROR:
        draft.authError = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);
