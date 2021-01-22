import React, { FC } from "react";
import classNames from "classnames";
import { Avatar, Image } from "antd";

import "./Message.scss";
import { IMessage } from "../../store/ducks/dialog/contracts/state";
import { parseEmojis } from "../../utils/parseEmojis";
import {getMessageTime} from "../../utils/utils";

interface MessageProps {
  message: IMessage;
  userId: string | undefined;
  sameSender?: boolean;
}

const Message: FC<MessageProps> = ({
  message,
  userId,
  sameSender,
}): JSX.Element => {
  const isMe = message.sender._id === userId;
  const avatarStyle =
    message.sender.avatar.length === 7
      ? { backgroundColor: message.sender.avatar }
      : undefined;
  return (
    <div
      className={classNames("message", {
        "message--me": isMe,
        "message--same": sameSender,
      })}
    >
      <div className="message__avatar">
        {!sameSender ? (
          <Avatar style={avatarStyle} size={40}>
            {message.sender.name[0].toUpperCase()}
          </Avatar>
        ) : (
          <div style={{ width: 40 }} />
        )}
      </div>
      <div className={"message__content"}>
        <div className="message__content-attachments">
          {message.attachments?.map((imageUrl) => {
            return <Image key={imageUrl} width={120} src={imageUrl} />;
          })}
        </div>
        {message.text && (
          <p
            className={classNames("message__content-text", {
              "message__content-text--read": message.read,
              "message__content-text--same": sameSender,
            })}
          >
            {parseEmojis(message.text)}
          </p>
        )}
        <div className="message__content-date">
          {getMessageTime(new Date(message.createdAt))}
        </div>
      </div>
    </div>
  );
};

export default Message;