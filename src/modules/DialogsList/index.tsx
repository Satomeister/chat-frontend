import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Empty, Input, Typography } from "antd";
import { SearchOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { isToday } from "date-fns";
import format from "date-fns/format";

import "./DialogsList.scss";

import AddDialog from "./components/AddDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectDialogs } from "../../store/ducks/dialogList/selector";
import { selectUserId } from "../../store/ducks/user/selector";
import { fetchDialogList } from "../../store/ducks/dialogList/actionCreators";
import { IDialog } from "../../store/ducks/dialogList/contracts/state";

const getMessageTime = (updatedAt: Date) => {
  if (isToday(updatedAt)) {
    return format(updatedAt, "hh:mm");
  } else {
    return format(updatedAt, "dd.mm.yyyy");
  }
};

const DialogsList: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredDialogs, setFilteredDialogs] = useState<IDialog[]>([]);
  const userId = useSelector(selectUserId);
  const dialogs = useSelector(selectDialogs);
  useEffect(() => {
    if (userId) {
      dispatch(fetchDialogList(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const dialogByUpdatedAt = [...dialogs]
      // @ts-ignore
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
      .reverse();
    setFilteredDialogs(dialogByUpdatedAt);
  }, [dialogs]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredDialogs(
      dialogs.filter(
        (dialog: IDialog) =>
          dialog.admin.name
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) >= 0 ||
          dialog.partner.name
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) >= 0
      )
    );
    setInputValue(e.target.value);
  };

  return (
    <div className="dialogs">
      <div className="dialogs__header">
        <TeamOutlined className="dialogs__header-icon" />
        <Typography className="dialogs__header-text">All Dialogs</Typography>
        <AddDialog />
      </div>
      <div className="dialogs__content">
        <div className="dialogs__content-search">
          <Input
            className="dialogs__content-search-input"
            onChange={onChangeInput}
            value={inputValue}
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined style={{ color: "#8C8C8C" }} />}
          />
        </div>
        <div className="dialogs__list">
          {filteredDialogs ? (
            filteredDialogs.map((dialog) => {
              const partner =
                dialog.admin._id === userId ? dialog.partner : dialog.admin;
              return (
                <NavLink
                  key={dialog._id}
                  to={`/dialog/${dialog._id}`}
                  activeClassName="dialogs__item--active"
                  className="dialogs__item"
                >
                  <div className="dialogs__item-avatar">
                    <Avatar size={40} icon={<UserOutlined />} />
                  </div>
                  <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                      <b>{partner.name}</b>
                      <span>{getMessageTime(new Date(partner.updatedAt))}</span>
                    </div>
                    <div className="dialogs__item-info-bottom">
                      <span>{dialog.lastMessage?.text}</span>
                      <div className="dialogs__item-info-bottom-count">9</div>
                    </div>
                  </div>
                </NavLink>
              );
            })
          ) : (
            <Empty description="No dialogs yet" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogsList;
