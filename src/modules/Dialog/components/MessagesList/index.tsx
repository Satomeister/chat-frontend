import React, { FC, RefObject, useEffect, useRef } from "react";
import { Message } from "../../../../components";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { selectMessages } from "../../../../store/ducks/dialog/selectors";
import { selectUserId } from "../../../../store/ducks/user/selector";
import { IMessage } from "../../../../store/ducks/dialog/contracts/state";

interface MessagesListProps {
  setMessagesRef: (ref: RefObject<HTMLDivElement>) => void;
}

const MessagesList: FC<MessagesListProps> = ({
  setMessagesRef,
}): JSX.Element => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const messages = useSelector(selectMessages);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    setMessagesRef(messagesRef);
    if (messagesRef.current) {
      messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
    }
  }, [messages, setMessagesRef]);

  return (
    <div ref={messagesRef} className="dialog__messages">
      {messages.length > 0 ? (
        messages.map((message: IMessage, index: number) => {
          if (
            messages[index + 1] &&
            message.sender === messages[index + 1].sender
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
        })
      ) : (
        <div style={{ marginTop: 170 }}>
          <Empty description="No messages yet" />
        </div>
      )}
    </div>
  );
};

export default MessagesList;
