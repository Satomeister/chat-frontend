import React, { FC, RefObject, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import {Result, Spin, Typography} from "antd";

import "emoji-mart/css/emoji-mart.css";

import "./Dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDialog, selectGetDialogError,
  selectGetDialogStatus, selectMessages,
} from "../../store/ducks/dialog/selectors";
import {
  fetchGetDialog, setMessagesRead,
  updateDialogOnlineStatus,
} from "../../store/ducks/dialog/actionCreators";
import { ChatInput, MessagesList } from "./components";
import { selectUserId } from "../../store/ducks/user/selector";
import { LoadingStatus } from "../../store/types";
import socket from "../../core/socket";
import { IUser } from "../../store/ducks/user/contracts/state";

const Dialog: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const dialog = useSelector(selectDialog);
  const userId = useSelector(selectUserId);
  const status = useSelector(selectGetDialogStatus);
  const error = useSelector(selectGetDialogError)
  const messages = useSelector(selectMessages)
  const [
    messagesRef,
    setMessagesRef,
  ] = useState<RefObject<HTMLDivElement> | null>(null);

  let partner;
  if (dialog) {
    partner = dialog.admin._id === userId ? dialog.partner : dialog.admin;
  }

  useEffect(() => {
    const listener = (isOnline: boolean, user: IUser) => {
      if (user._id === dialog?.admin._id || user._id === dialog?.partner._id) {
        dispatch(updateDialogOnlineStatus({ user, isOnline }));
      }
    };
    socket.on("USER:NEW_STATUS", listener);
    return () => {
      socket.off("USER:NEW_STATUS", listener);
    };
  }, [dialog, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchGetDialog(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const listener = (dialogId: string) => {
      dispatch(setMessagesRead(dialogId))
    }
    socket.on("MESSAGE:IS_READ", listener)
    return () => {
      socket.off("MESSAGE:IS_READ", listener)
    }
  }, [dispatch])

  const scrollMessagesDown = () => {
    if (messagesRef?.current)
      messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  };

  if (status === LoadingStatus.NEVER || status === LoadingStatus.LOADING) {
    return (
      <div className="dialog centered">
        <Spin />
      </div>
    );
  }

  return (
    <div className="dialog">
      {
        !error ? (
          <>
            <div className="dialog__header">
              <div className="dialog__header-info">
                <Typography className="dialog__header-info-title">
                  {partner?.name}
                </Typography>

                <div
                  className={classNames({
                    "dialog__header-info-online": partner?.isOnline,
                    "dialog__header-info-offline": !partner?.isOnline,
                  })}
                >
                  {partner?.isOnline ? "online" : "offline"}
                </div>
              </div>
            </div>
          <MessagesList messages={messages} setMessagesRef={setMessagesRef} />
        <ChatInput dialogId={dialog!._id} isFirstMessage={messages.length === 0} scrollMessagesDown={scrollMessagesDown} />
          </>
        )
        : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the dialog is not found."
            />
        )
      }
    </div>
  );
};

export default Dialog;
