import React, { FC } from "react";
import classNames from "classnames";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons/lib";
import formatDistance from "date-fns/formatDistance";
import { DownloadOutlined } from "@ant-design/icons";

import "./Message.scss";
import { IMessage } from "../../store/ducks/dialog/contracts/state";
import { parseEmojis } from "../../utils/parseEmojis";

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
  const isMe = message.sender === userId;

  return (
    <div
      className={classNames("message", {
        "message--me": isMe,
        "message--same": sameSender,
      })}
    >
      <div className="message__avatar">
        {!sameSender ? (
          <Avatar size={40} icon={<UserOutlined />} />
        ) : (
          <div style={{ width: 40 }} />
        )}
      </div>
      <div className={"message__content"}>
        <div className="message__content-attachments">
          {message.attachments?.map((att) => {
            if (att.type === "image") {
              return <Image width={120} src={att.url} />;
            } else {
              return (
                <div className="message__content-attachments-file">
                  <div className="message__content-attachments-file-top">
                    <span>FileName.jsx</span>
                    <span>Size: 123 kb.</span>
                  </div>
                  <div className="message__content-attachments-file-bottom">
                    <DownloadOutlined />
                    <span>Download</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <p
          className={classNames("message__content-text", {
            "message__content-text--read": message.read,
            "message__content-text--same": sameSender,
          })}
        >
          {parseEmojis(message.text || "")}
        </p>
        <div className="message__content-date">
          {formatDistance(new Date(), new Date(message.createdAt))}
        </div>
      </div>
    </div>
  );
};

export default Message;