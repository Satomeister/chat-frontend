import React, { FC, useCallback, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Home.scss";

import socket from "../../core/socket";
import { Dialog, DialogsList } from "../../modules";
import { IMessage } from "../../store/ducks/dialog/contracts/state";
import { IDialog } from "../../store/ducks/dialogList/contracts/state";
import { addMessage } from "../../store/ducks/dialog/actionCreators";
import {
  setDialogLastMessageRead,
  setDialogUnreadMessagesCount,
  updateDialogListItem,
} from "../../store/ducks/dialogList/actionCreators";
import { selectDialogId } from "../../store/ducks/dialog/selectors";
import { selectUserId } from "../../store/ducks/user/selector";
import { showNewOnlineStatus } from "../../utils/utils";
import { updateUserOnlineStatus } from "../../store/ducks/user/actionCreators";
import { HomeEmpty } from "../../components";

const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDialogId = useSelector(selectDialogId);
  const userId = useSelector(selectUserId);
  const [visible, setVisible] = useState<boolean>();

  const setMessagesReadSocket = useCallback(
    (dialogId: string) => {
      dispatch(setDialogUnreadMessagesCount(dialogId));
      socket.emit("MESSAGE:READ", dialogId, userId);
    },
    [dispatch, userId]
  );

  useEffect(() => {
    if (visible === undefined && currentDialogId) {
      setMessagesReadSocket(currentDialogId);
    }
    // eslint-disable-next-line
  }, [currentDialogId]);

  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      showNewOnlineStatus(false, userId);
    };
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  });

  useEffect(() => {
    const listener = () => {
      if (document.visibilityState === "visible") {
        setVisible(true);
        showNewOnlineStatus(true, userId);
        dispatch(updateUserOnlineStatus(true));
        currentDialogId && setMessagesReadSocket(currentDialogId);
      } else {
        setVisible(false);
        showNewOnlineStatus(false, userId);
        dispatch(updateUserOnlineStatus(false));
      }
    };
    document.addEventListener("visibilitychange", listener);
    return () => {
      document.removeEventListener("visibilitychange", listener);
    };
  }, [dispatch, userId, currentDialogId, setMessagesReadSocket]);

  useEffect(() => {
    const listener = ({
      message,
      dialog,
    }: {
      message: IMessage;
      dialog: IDialog;
    }) => {
      dispatch(updateDialogListItem(dialog));
      if (currentDialogId === dialog._id) {
        dispatch(addMessage(message));
        if (visible || visible === undefined) {
          setMessagesReadSocket(currentDialogId);
        }
      }
    };
    socket.on("MESSAGE:SEND_MESSAGE", listener);
    return () => {
      socket.off("MESSAGE:SEND_MESSAGE", listener);
    };
    // eslint-disable-next-line
  }, [currentDialogId, visible]);

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
      <Route exact path="/" component={HomeEmpty} />
      <Route exact path="/dialog/:id" component={Dialog} />
    </div>
  );
};

export default Home;
