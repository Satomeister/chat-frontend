import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import { Message } from "../../../../components";
import { Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../store/ducks/user/selector";
import { IMessage } from "../../../../store/ducks/dialog/contracts/state";
import { fetchGetNewMessagesChunk } from "../../../../store/ducks/dialog/actionCreators";
import {
  selectDialogId,
  selectGetExtraMessageStatus,
} from "../../../../store/ducks/dialog/selectors";
import { LoadingStatus } from "../../../../store/types";

interface MessagesListProps {
  messages: IMessage[];
  setMessagesRef: (ref: RefObject<HTMLDivElement>) => void;
}

const MessagesList: FC<MessagesListProps> = ({
  messages,
  setMessagesRef,
}): JSX.Element => {
  const dispatch = useDispatch();
  const messagesRef = useRef<HTMLDivElement>(null);
  const userId = useSelector(selectUserId);
  const dialogId = useSelector(selectDialogId);
  const getExtraMessagesStatus = useSelector(selectGetExtraMessageStatus);

  const [prevHeight, setPrevHeight] = useState<number>(0)
  useEffect(() => {
    if (getExtraMessagesStatus === LoadingStatus.SUCCESS || getExtraMessagesStatus === 'END') {
      if (messagesRef.current){
        const scrollPositionBeforeExtraMessages = messagesRef.current.scrollHeight - prevHeight
        console.log(scrollPositionBeforeExtraMessages)
        messagesRef.current.scroll(0, scrollPositionBeforeExtraMessages);
      }
    }
    //eslint-disable-next-line
  }, [getExtraMessagesStatus])

  useEffect(() => {
    const el = messagesRef.current;
    const listener = () => {
      if (messagesRef.current && messagesRef.current.scrollTop < 10 ) {
        if (dialogId) {
          setPrevHeight(messagesRef.current.scrollHeight)
          dispatch(
            fetchGetNewMessagesChunk({ dialogId, count: messages.length })
          );
          el?.removeEventListener("scroll", listener);
        }
      }
    };
    if (getExtraMessagesStatus !== "END" && getExtraMessagesStatus !== LoadingStatus.LOADING) {
      el?.addEventListener("scroll", listener);
    }
    return () => {
      el?.removeEventListener("scroll", listener);
    };
  }, [dispatch, dialogId, messages, getExtraMessagesStatus]);

  useEffect(() => {
    setMessagesRef(messagesRef);
    if (messagesRef.current && getExtraMessagesStatus === LoadingStatus.NEVER) {
      messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div ref={messagesRef} className="dialog__messages">
      {getExtraMessagesStatus === LoadingStatus.LOADING && (
        <Spin style={{ display: "flex", justifyContent: "center" }} />
      )}
      {messages.length > 0 ? (
        messages
          .map((message: IMessage, index: number) => {
            if (
              messages[index - 1] &&
              message.sender._id === messages[index - 1].sender._id
            ) {
              return (
                <Message
                  key={message._id}
                  message={message}
                  userId={userId}
                  sameSender
                />
              );
            }
            return (
              <Message key={message._id} message={message} userId={userId} />
            );
          }).reverse()
      ) : (
        <div style={{ marginTop: 170 }}>
          <Empty description="No messages yet" />
        </div>
      )}
    </div>
  );
};

export default MessagesList;
