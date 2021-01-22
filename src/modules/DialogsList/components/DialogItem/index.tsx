import React, { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "antd";
import classNames from "classnames";

import "./DialogItem.scss";

import readImg from "../../../../assets/images/read/read.svg";
import unreadImg from "../../../../assets/images/read/unread.svg";
import { IDialog } from "../../../../store/ducks/dialogList/contracts/state";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../store/ducks/user/selector";
import { IUser } from "../../../../store/ducks/user/contracts/state";
import socket from "../../../../core/socket";
import { updateDialogListItemStatusOnline } from "../../../../store/ducks/dialogList/actionCreators";
import { getMessageTime } from "../../../../utils/utils";

interface DialogItemProps {
  dialog: IDialog;
}

const DialogItem: FC<DialogItemProps> = ({ dialog }): JSX.Element => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const partner = dialog.admin._id === userId ? dialog.partner : dialog.admin;

  useEffect(() => {
    const listener = (isOnline: boolean, user: IUser) => {
      if (partner._id === user._id) {
        dispatch(updateDialogListItemStatusOnline(user));
      }
    };
    socket.on("USER:NEW_STATUS", listener);
    return () => {
      socket.off("USER:NEW_STATUS", listener);
    };
  }, [partner, dispatch]);

  const avatarStyle =
    partner.avatar.length === 7
      ? { backgroundColor: partner.avatar }
      : undefined;

  return (
    <NavLink
      key={dialog._id}
      to={`/dialog/${dialog._id}`}
      activeClassName="dialog-item--active"
      className="dialog-item"
    >
      <div
        className={classNames("dialog-item__avatar", {
          "dialog-item__avatar--online": partner.isOnline,
        })}
      >
        <Avatar style={avatarStyle} size={40}>
          {partner.name[0].toUpperCase()}
        </Avatar>
      </div>
      <div className="dialog-item__info">
        <div className="dialog-item__info-top">
          <b>{partner.name}</b>
          <span>
            {dialog.lastMessage &&
              getMessageTime(new Date(dialog.lastMessage.createdAt))}
          </span>
        </div>
        {dialog.lastMessage?.sender._id === userId ? (
          <div className="dialog-item__info-bottom">
            <span>
              <span style={{ color: "#1890ff" }}>You: </span>
              {dialog.lastMessage?.text}
            </span>
            <div>
              {dialog.lastMessage?.read ? (
                <img src={readImg} alt="read" />
              ) : (
                <img src={unreadImg} alt="unread" />
              )}
            </div>
          </div>
        ) : (
          <div className="dialog-item__info-bottom">
            <span>{dialog.lastMessage?.text}</span>
            {+dialog.unreadMessagesCount > 0 && (
              <div className="dialog-item__info-bottom-count">
                {dialog.unreadMessagesCount}
              </div>
            )}
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default DialogItem;