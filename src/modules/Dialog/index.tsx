import React, { FC, RefObject, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { Spin, Typography } from "antd";

import "emoji-mart/css/emoji-mart.css";
import "./Dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDialog,
  selectGetMessagesStatus,
} from "../../store/ducks/dialog/selectors";
import {
  addMessage,
  fetchGetDialog,
} from "../../store/ducks/dialog/actionCreators";
import { ChatInput, MessagesList } from "./components";
import { selectUserId } from "../../store/ducks/user/selector";
import { LoadingStatus } from "../../store/types";
import socket from "../../core/socket";
import { IMessage } from "../../store/ducks/dialog/contracts/state";
import { updateDialogLastMessage } from "../../store/ducks/dialogList/actionCreators";

const Dialog: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const dialog = useSelector(selectDialog);
  const userId = useSelector(selectUserId);
  const status = useSelector(selectGetMessagesStatus);
  const [
    messagesRef,
    setMessagesRef,
  ] = useState<RefObject<HTMLDivElement> | null>(null);

  let partner;
  if (dialog) {
    partner = dialog.admin._id === userId ? dialog.partner : dialog.admin;
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchGetDialog(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dialog) {
      socket.on("MESSAGE:SEND_MESSAGE", (message: IMessage) => {
        dispatch(addMessage(message));
        const newDialog = {
          ...dialog,
          lastMessage: message,
          updatedAt: new Date(),
        };
        dispatch(updateDialogLastMessage(newDialog));
      });
    }
    return () => {
      socket.off("MESSAGE:SEND_MESSAGE");
    };
    // eslint-disable-next-line
  }, [dialog]);

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
      <div className="dialog__header">
        <div className="dialog__header-info">
          <Typography className="dialog__header-info-title">
            {partner?.name}
          </Typography>

          <div
            className={classNames({
              "dialog__header-info-online": true,
              "dialog__header-info-offline": false,
            })}
          >
            online
          </div>
        </div>
      </div>
      <MessagesList setMessagesRef={setMessagesRef} />
      <ChatInput dialogId={id} scrollMessagesDown={scrollMessagesDown} />
    </div>
  );
};

export default Dialog;
