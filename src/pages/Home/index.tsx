import React, {FC, useCallback, useEffect} from "react";
import { Route } from "react-router-dom";
import {Empty, Result} from "antd";
import { useDispatch, useSelector } from "react-redux";

import "./Home.scss";

import socket from "../../core/socket";
import { Dialog, DialogsList } from "../../modules";
import { IMessage } from "../../store/ducks/dialog/contracts/state";
import { IDialog } from "../../store/ducks/dialogList/contracts/state";
import { addMessageWithRead } from "../../store/ducks/dialog/actionCreators";
import {
  setDialogLastMessageRead,
  setDialogUnreadMessagesCount,
  updateDialogLastMessage,
} from "../../store/ducks/dialogList/actionCreators";
import { selectDialogId } from "../../store/ducks/dialog/selectors";
import { selectUserId } from "../../store/ducks/user/selector";
import { showNewOnlineStatus } from "../../utils/utils";
import { updateUserOnlineStatus } from "../../store/ducks/user/actionCreators";



const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDialogId = useSelector(selectDialogId);
  const userId = useSelector(selectUserId);

  const setMessageReadSocket = useCallback((dialogId: string) => {
    dispatch(setDialogUnreadMessagesCount(dialogId));
    socket.emit("MESSAGE:READ", dialogId, userId);
  }, [dispatch, userId]);

  useEffect(() => {
    if (document.visibilityState === "visible") {
      currentDialogId && setMessageReadSocket(currentDialogId);
    }
  }, [currentDialogId, setMessageReadSocket])

  useEffect(() => {
    const listener = () => {
      if (document.visibilityState === "visible") {
        showNewOnlineStatus(true, userId);
        dispatch(updateUserOnlineStatus(true));
        currentDialogId && setMessageReadSocket(currentDialogId);
      } else {
        showNewOnlineStatus(false, userId);
        dispatch(updateUserOnlineStatus(false));
      }
    };
    document.addEventListener("visibilitychange", listener);
    return () => {
      document.removeEventListener("visibilitychange", listener);
    };
  }, [dispatch, userId, currentDialogId]);

  useEffect(() => {
    const listener = ({
      message,
      dialog,
    }: {
      message: IMessage;
      dialog: IDialog;
    }) => {
      dispatch(updateDialogLastMessage(dialog));
      if (currentDialogId === dialog._id) {
        dispatch(addMessageWithRead(message));
        if (document.visibilityState === "visible") {
          setMessageReadSocket(currentDialogId);
        }
      }
    };
    socket.on("MESSAGE:SEND_MESSAGE", listener);
    return () => {
      socket.off("MESSAGE:SEND_MESSAGE", listener);
    };
    // eslint-disable-next-line
  }, [currentDialogId]);

  useEffect(() => {
    const listener = (dialogId: string) => {
      dispatch(setDialogLastMessageRead(dialogId));
    };
    socket.on("MESSAGE:IS_READ", listener);
    return () => {
      socket.off("MESSAGE:IS_READ", listener);
    };
  }, [dispatch]);

  return (
    <div className="home">
      <DialogsList />
      <Route
        exact
        path="/"
        component={() => (
          <div
            className="dialog"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Empty
              description="Select a chat to start messaging"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
        )}
      />
      <Route exact path="/dialog/:id" component={Dialog} />
    </div>
  );
};

export default Home;
